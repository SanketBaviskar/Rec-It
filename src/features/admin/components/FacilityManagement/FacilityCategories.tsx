import { useState, useEffect } from "react";
import {
	getFacilityCategories,
	createFacilityCategory,
	deleteFacilityCategory,
	FacilityCategory,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";
import { Facility } from "@/pages/MainWindow/CalenderTab/types"; // Reuse types
// Need an API to create facilities linked to category.
// Assuming createFacility in facilityApi supports categoryId now.
import {
	createFacility,
	deleteFacility,
} from "@/services/Api/Facility/facilityApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react";
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

	// State for new room form
	const [addingRoomTo, setAddingRoomTo] = useState<number | null>(null);
	const [newRoomData, setNewRoomData] = useState({
		name: "",
		capacity: 10,
		location: "",
		manager: "",
	});

	// Expansion state
	const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

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
		if (!confirm("Delete this category and all its rooms?")) return;
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

	const toggleExpand = (id: number) => {
		setExpandedCategories((prev) =>
			prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
		);
	};

	const handleAddRoom = async (categoryId: number) => {
		if (!newRoomData.name) return;
		try {
			// Updated API expected to handle categoryId
			await createFacility({
				...newRoomData,
				categoryId,
			});
			setAddingRoomTo(null);
			setNewRoomData({
				name: "",
				capacity: 10,
				location: "",
				manager: "",
			});
			fetchCategories(); // Refresh to see new room
			toast({ title: "Success", description: "Room added" });
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to add room",
				variant: "destructive",
			});
		}
	};

	const handleDeleteRoom = async (id: string) => {
		if (!confirm("Delete this room?")) return;
		try {
			await deleteFacility(id);
			fetchCategories();
			toast({ title: "Success", description: "Room deleted" });
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to delete room",
				variant: "destructive",
			});
		}
	};

	if (loading) return <LoadingSpinner />;

	return (
		<div className="p-6 space-y-6">
			<h1 className="text-2xl font-bold">Facility Management</h1>

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
			<div className="space-y-4">
				{categories.map((category) => (
					<Card key={category.id} className="overflow-hidden">
						<div className="p-4 flex items-center justify-between bg-gray-50 border-b">
							<div
								className="flex items-center gap-2 cursor-pointer"
								onClick={() => toggleExpand(category.id)}
							>
								{expandedCategories.includes(category.id) ? (
									<ChevronDown className="h-5 w-5" />
								) : (
									<ChevronRight className="h-5 w-5" />
								)}
								<span className="font-semibold text-lg">
									{category.name}
								</span>
								<span className="text-muted-foreground text-sm">
									({category.facilities?.length || 0} rooms)
								</span>
							</div>
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

						{expandedCategories.includes(category.id) && (
							<div className="p-4 bg-white space-y-4">
								{/* List Rooms */}
								<div className="space-y-2 pl-6">
									{category.facilities &&
									category.facilities.length > 0 ? (
										category.facilities.map((room: any) => (
											<div
												key={room.id}
												className="flex items-center justify-between p-2 border rounded-md hover:bg-gray-50"
											>
												<div>
													<div className="font-medium">
														{room.name}
													</div>
													<div className="text-xs text-muted-foreground">
														Cap: {room.capacity} |
														Loc: {room.location}
													</div>
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														handleDeleteRoom(
															room.id
														)
													}
												>
													<Trash2 className="h-3 w-3 text-red-400" />
												</Button>
											</div>
										))
									) : (
										<div className="text-muted-foreground italic">
											No rooms in this category.
										</div>
									)}
								</div>

								{/* Add Room Form */}
								{addingRoomTo === category.id ? (
									<div className="border p-4 rounded-md space-y-4 bg-gray-50 ml-6">
										<h4 className="font-medium">
											Add Room to {category.name}
										</h4>
										<div className="grid grid-cols-2 gap-4">
											<div>
												<Label>Name</Label>
												<Input
													value={newRoomData.name}
													onChange={(e) =>
														setNewRoomData({
															...newRoomData,
															name: e.target
																.value,
														})
													}
													placeholder="Room Name (e.g. Court 1)"
												/>
											</div>
											<div>
												<Label>Capacity</Label>
												<Input
													type="number"
													value={newRoomData.capacity}
													onChange={(e) =>
														setNewRoomData({
															...newRoomData,
															capacity: parseInt(
																e.target.value
															),
														})
													}
												/>
											</div>
											<div>
												<Label>Location</Label>
												<Input
													value={newRoomData.location}
													onChange={(e) =>
														setNewRoomData({
															...newRoomData,
															location:
																e.target.value,
														})
													}
												/>
											</div>
											<div>
												<Label>Manager</Label>
												<Input
													value={newRoomData.manager}
													onChange={(e) =>
														setNewRoomData({
															...newRoomData,
															manager:
																e.target.value,
														})
													}
												/>
											</div>
										</div>
										<div className="flex gap-2">
											<Button
												size="sm"
												onClick={() =>
													handleAddRoom(category.id)
												}
											>
												Save Room
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() =>
													setAddingRoomTo(null)
												}
											>
												Cancel
											</Button>
										</div>
									</div>
								) : (
									<Button
										variant="outline"
										size="sm"
										className="ml-6"
										onClick={() =>
											setAddingRoomTo(category.id)
										}
									>
										<Plus className="mr-2 h-3 w-3" /> Add
										Room
									</Button>
								)}
							</div>
						)}
					</Card>
				))}
			</div>
		</div>
	);
}
