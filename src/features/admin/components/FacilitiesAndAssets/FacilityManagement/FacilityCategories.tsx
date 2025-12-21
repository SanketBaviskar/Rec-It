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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Building2 } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";
import LoadingSpinner from "@/components/ui/loadingSpinner";

interface FacilityCategoriesProps {
	onSelectCategory?: (category: FacilityCategory) => void;
}

export default function FacilityCategories({
	onSelectCategory,
}: FacilityCategoriesProps) {
	const { toast } = useToast();
	const [categories, setCategories] = useState<FacilityCategory[]>([]);
	const [loading, setLoading] = useState(true);
	const [newCategoryName, setNewCategoryName] = useState("");
	const [newCategoryDescription, setNewCategoryDescription] = useState("");

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
				description: newCategoryDescription || undefined,
			});
			setNewCategoryName("");
			setNewCategoryDescription("");
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
		if (!confirm("Delete this category and all its facilities?")) return;
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
				Create categories to organize your facilities (e.g., "Study
				Rooms", "Basketball Courts", "Swimming Pools"). Then add
				individual facilities under each category.
			</p>

			{/* Create Category */}
			<Card>
				<CardHeader>
					<CardTitle>Add New Category</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div className="space-y-2">
							<Label>Category Name *</Label>
							<Input
								value={newCategoryName}
								onChange={(e) =>
									setNewCategoryName(e.target.value)
								}
								placeholder='e.g., "Study Rooms", "Tennis Courts"'
							/>
						</div>
						<div className="space-y-2">
							<Label>Description (optional)</Label>
							<Textarea
								value={newCategoryDescription}
								onChange={(e) =>
									setNewCategoryDescription(e.target.value)
								}
								placeholder="Brief description of this facility type"
								rows={1}
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
				{categories.length === 0 ? (
					<Card className="col-span-full">
						<CardContent className="p-6 text-center text-muted-foreground">
							No categories yet. Create one above to get started.
						</CardContent>
					</Card>
				) : (
					categories.map((category) => (
						<Card
							key={category.id}
							className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
							onClick={() => onSelectCategory?.(category)}
						>
							<div className="p-4 flex flex-col gap-2">
								<div className="flex justify-between items-start">
									<div className="flex items-center gap-2">
										<Building2 className="h-5 w-5 text-muted-foreground" />
										<span className="font-semibold text-lg">
											{category.name}
										</span>
									</div>
									<Button
										variant="ghost"
										size="sm"
										onClick={(e) => {
											e.stopPropagation();
											handleDeleteCategory(category.id);
										}}
									>
										<Trash2 className="h-4 w-4 text-red-500" />
									</Button>
								</div>
								{category.description && (
									<p className="text-sm text-muted-foreground">
										{category.description}
									</p>
								)}
								<div className="text-xs text-muted-foreground mt-2">
									{category.facilities?.length || 0}{" "}
									facilities
								</div>
							</div>
						</Card>
					))
				)}
			</div>
		</div>
	);
}
