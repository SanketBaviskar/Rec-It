import { useState, useEffect } from "react";
import {
	getFacilityCategories,
	createFacilityCategory,
	deleteFacilityCategory,
	FacilityCategory,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import LoadingSpinner from "@/components/ui/loadingSpinner";

export default function FacilityCategories() {
	const { toast } = useToast();
	const [categories, setCategories] = useState<FacilityCategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [newCategoryDetails, setNewCategoryDetails] = useState({
		location: "",
		manager: "",
		capacity: 0,
		description: "",
	});

	useEffect(() => {
		fetchCategories();
	}, []);

	const fetchCategories = async () => {
		setLoading(true);
		try {
			const data = await getFacilityCategories();
			setCategories(data);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to load categories",
				variant: "destructive",
			});
		} finally {
			setLoading(false);
		}
	};

	const handleCreateCategory = async () => {
		if (!newCategoryName.trim()) return;
		try {
			await createFacilityCategory({
				name: newCategoryName,
				...newCategoryDetails,
			});
			setNewCategoryName("");
			setNewCategoryDetails({
				location: "",
				manager: "",
				capacity: 0,
				description: "",
			});
			fetchCategories();
			toast({ title: "Success", description: "Category created" });
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to create category",
				variant: "destructive",
			});
		}
	};

	const handleDeleteCategory = async (id: number) => {
		if (!confirm("Delete this category?")) return;
		try {
			await deleteFacilityCategory(id);
			fetchCategories();
			toast({ title: "Success", description: "Category deleted" });
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to delete category",
				variant: "destructive",
			});
		}
	};

	if (loading) return <LoadingSpinner />;

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Facility Categories</h1>
			<p className="text-muted-foreground">
				Manage the types of facilities available (e.g., Gym, Pool).
			</p>

			{/* Create Category */}
			<Card>
				<CardHeader>
					<CardTitle>Add New Category</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Category Name (e.g., "Tennis Courts")</Label>
							<Input
								value={newCategoryName}
								onChange={(e) =>
									setNewCategoryName(e.target.value)
								}
								placeholder="Enter category name"
							/>
						</div>
						<div className="space-y-2">
							<Label>Location</Label>
							<Input
								value={newCategoryDetails.location}
								onChange={(e) =>
									setNewCategoryDetails({
										...newCategoryDetails,
										location: e.target.value,
									})
								}
								placeholder="e.g. North Wing"
							/>
						</div>
						<div className="space-y-2">
							<Label>Manager</Label>
							<Input
								value={newCategoryDetails.manager}
								onChange={(e) =>
									setNewCategoryDetails({
										...newCategoryDetails,
										manager: e.target.value,
									})
								}
								placeholder="e.g. John Doe"
							/>
						</div>
						<div className="space-y-2">
							<Label>Max Occupancy</Label>
							<Input
								type="number"
								value={newCategoryDetails.capacity}
								onChange={(e) =>
									setNewCategoryDetails({
										...newCategoryDetails,
										capacity: parseInt(e.target.value) || 0,
									})
								}
							/>
						</div>
					</div>
					<Button className="w-full" onClick={handleCreateCategory}>
						<Plus className="mr-2 h-4 w-4" /> Add Category
					</Button>
				</CardContent>
			</Card>

			{/* List Categories */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				{categories.map((category) => (
					<Card key={category.id} className="overflow-hidden">
						<div className="p-4 flex flex-col gap-2">
							<div className="flex justify-between items-start">
								<span className="font-semibold text-lg">
									{category.name}
								</span>
								<Button
									variant="ghost"
									size="sm"
									onClick={() =>
										handleDeleteCategory(category.id)
									}
								>
									<Trash2 className="h-4 w-4 text-red-500" />
								</Button>
							</div>
							<div className="text-sm text-muted-foreground space-y-1">
								{category.location && (
									<div>Loc: {category.location}</div>
								)}
								{category.manager && (
									<div>Mgr: {category.manager}</div>
								)}
								{category.capacity && (
									<div>Cap: {category.capacity}</div>
								)}
							</div>
						</div>
					</Card>
				))}
			</div>
		</div>
	);
}
