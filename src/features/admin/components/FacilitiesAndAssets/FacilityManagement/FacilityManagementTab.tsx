import { useState, useEffect } from "react";
import { Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/hooks/use-toast";
import {
	fetchFacilities,
	createFacility,
	deleteFacility,
	Facility,
} from "@/services/Api/Facility/facilityApi";
import {
	getFacilityCategories,
	createFacilityCategory,
	FacilityCategory,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";
import FacilitySidebar from "./FacilitySidebar";
import FacilityItems from "./FacilityItems";

export default function FacilityManagementTab() {
	const { toast } = useToast();
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [categories, setCategories] = useState<FacilityCategory[]>([]);
	const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
		null
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const [activeCategoryId, setActiveCategoryId] = useState<number | null>(
		null
	);
	const [activeCategoryName, setActiveCategoryName] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Form data for adding category or facility
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		location: "",
		capacity: 0,
	});

	const loadFacilities = async () => {
		try {
			const [facilitiesData, categoriesData] = await Promise.all([
				fetchFacilities(),
				getFacilityCategories(),
			]);
			setFacilities(facilitiesData);
			setCategories(categoriesData);
		} catch {
			toast({
				title: "Error",
				description: "Failed to load facilities",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		loadFacilities();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleOpenModal = (
		categoryId?: number,
		categoryName?: string,
		isCategory: boolean = false
	) => {
		setIsAddingCategory(isCategory);
		setActiveCategoryId(categoryId || null);
		setActiveCategoryName(categoryName || "");
		setFormData({
			name: "",
			description: "",
			location: "",
			capacity: 0,
		});
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (isAddingCategory) {
				await createFacilityCategory({
					name: formData.name,
					description: formData.description || undefined,
				});
				toast({
					title: "Created",
					description: "Category created successfully",
				});
			} else if (activeCategoryId) {
				await createFacility({
					categoryId: activeCategoryId,
					name: formData.name,
					description: formData.description || undefined,
					location: formData.location || undefined,
					capacity: formData.capacity || undefined,
				});
				toast({
					title: "Created",
					description: "Facility created successfully",
				});
			}
			setIsModalOpen(false);
			loadFacilities();
		} catch {
			toast({
				title: "Error",
				description: "Operation failed",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleDelete = async (id: number) => {
		try {
			await deleteFacility(id);
			toast({
				title: "Deleted",
				description: "Facility deleted successfully",
			});
			loadFacilities();
			if (selectedFacility?.id === id) {
				setSelectedFacility(null);
			}
		} catch {
			toast({
				title: "Error",
				description: "Failed to delete facility",
				variant: "destructive",
			});
		}
	};

	// Get the selected category for displaying facilities
	const selectedCategory = selectedFacility
		? categories.find((c) => c.id === selectedFacility.categoryId)
		: null;

	return (
		<div className="flex h-full">
			{/* Left sidebar */}
			<div className="w-64 border-r bg-background p-4 flex flex-col h-full">
				<div className="flex justify-between items-center mb-4 shrink-0">
					<div className="font-semibold">Facility List</div>
					<Button
						variant="outline"
						size="icon"
						onClick={() =>
							handleOpenModal(undefined, undefined, true)
						}
						aria-label="Add New Facility Category"
					>
						<Plus className="h-4 w-4" />
					</Button>
				</div>
				<div className="overflow-y-auto flex-1 -mx-2 px-2">
					<FacilitySidebar
						categories={categories}
						facilities={facilities}
						selectedFacilityId={selectedFacility?.id || null}
						onSelectFacility={(id) => {
							const facility = facilities.find(
								(f) => f.id === id
							);
							setSelectedFacility(facility || null);
						}}
						onAddFacility={(catId, catName) =>
							handleOpenModal(catId, catName, false)
						}
						onDeleteFacility={handleDelete}
					/>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 p-6 h-full overflow-hidden flex flex-col">
				<div className="flex-1 overflow-y-auto">
					{selectedFacility && selectedCategory ? (
						<FacilityItems
							category={selectedCategory}
							onBack={() => setSelectedFacility(null)}
						/>
					) : (
						<div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
							<Building className="h-12 w-12 mb-4 opacity-20" />
							<p className="text-lg font-medium">
								Select a facility to view details
							</p>
							<p className="text-sm">
								Or add a new category using the + button
							</p>
						</div>
					)}
				</div>
			</div>

			{/* Modal for adding category or facility */}
			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{isAddingCategory
								? "Add New Category"
								: `Add Facility to ${activeCategoryName}`}
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name *</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										name: e.target.value,
									}))
								}
								required
								placeholder={
									isAddingCategory
										? 'e.g., "Study Rooms", "Courts"'
										: 'e.g., "Study Room A", "Court 1"'
								}
							/>
						</div>

						<div className="grid gap-2">
							<Label htmlFor="description">Description</Label>
							<Textarea
								id="description"
								value={formData.description}
								onChange={(e) =>
									setFormData((prev) => ({
										...prev,
										description: e.target.value,
									}))
								}
								placeholder="Brief description"
								rows={2}
							/>
						</div>

						{/* Only show location and capacity for facilities, not categories */}
						{!isAddingCategory && (
							<>
								<div className="grid gap-2">
									<Label htmlFor="location">Location</Label>
									<Input
										id="location"
										value={formData.location}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												location: e.target.value,
											}))
										}
										placeholder="e.g., Building A, Floor 2"
									/>
								</div>

								<div className="grid gap-2">
									<Label htmlFor="capacity">Capacity</Label>
									<Input
										id="capacity"
										type="number"
										value={formData.capacity || ""}
										onChange={(e) =>
											setFormData({
												...formData,
												capacity:
													parseInt(e.target.value) ||
													0,
											})
										}
										placeholder="Maximum occupancy"
									/>
								</div>
							</>
						)}

						<div className="flex justify-end gap-2 pt-4">
							<Button
								type="button"
								variant="outline"
								onClick={() => setIsModalOpen(false)}
							>
								Cancel
							</Button>
							<Button type="submit" disabled={isLoading}>
								{isLoading
									? "Saving..."
									: isAddingCategory
									? "Add Category"
									: "Add Facility"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
