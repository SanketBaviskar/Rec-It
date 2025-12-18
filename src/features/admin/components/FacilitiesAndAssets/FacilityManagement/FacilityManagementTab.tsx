import { useState, useEffect } from "react";
import { Plus, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/hooks/use-toast";
import { fetchFacilities, Facility } from "@/services/Api/Facility/facilityApi";
import {
	addFacility,
	CreateFacilityDto,
} from "@/services/Api/Admin/Facility/addFacility";
import {
	getFacilityCategories,
	FacilityCategory,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";
import { updateFacility } from "@/services/Api/Admin/Facility/updateFacility";
import { deleteFacility } from "@/services/Api/Admin/Facility/deleteFacility";
import FacilitySidebar from "./FacilitySidebar";
import FacilityItems from "./FacilityItems";

export default function FacilityManagementTab() {
	const { toast } = useToast();
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [categories, setCategories] = useState<FacilityCategory[]>([]);
	const [activeComponent, setActiveComponent] = useState<
		"Items" | "Form" | null
	>(null);
	const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
		null
	);

	const [isAddingCategory, setIsAddingCategory] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingFacility, setEditingFacility] = useState<Facility | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<CreateFacilityDto>({
		name: "",
		description: "",
		capacity: 0,
		location: "",
		manager: "",
		type: "",
		categoryId: undefined,
		quantity: 0,
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
		facility?: Facility,
		categoryId?: number,
		categoryName?: string,
		isCategory: boolean = false
	) => {
		setIsAddingCategory(isCategory);
		if (facility) {
			setEditingFacility(facility);
			setFormData({
				name: facility.name,
				description: facility.description || "",
				capacity: facility.capacity,
				location: facility.location,
				manager: facility.manager,
				type: facility.type || "Court",
				quantity: 0, // Quantity is typically read-only or 0 on edit
			});
		} else {
			setEditingFacility(null);
			setFormData({
				name: "",
				description: "",
				capacity: 0,
				location: "",
				manager: "",
				type: categoryName || "Court", // Default to categoryName if provided
				categoryId: categoryId,
				quantity: 1,
			});
		}
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (isAddingCategory) {
				await import(
					"@/services/Api/FacilityCategory/facilityCategoryApi"
				).then((mod) =>
					mod.createFacilityCategory({
						name: formData.name,
						description: formData.description,
						manager: formData.manager,
						location: formData.location,
					})
				);
				toast({
					title: "Created",
					description: "Category created successfully",
				});
			} else if (editingFacility) {
				await updateFacility(editingFacility.id, formData);
				toast({
					title: "Updated",
					description: "Facility updated successfully",
				});
			} else {
				await addFacility(formData);
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
				setActiveComponent(null);
			}
		} catch {
			toast({
				title: "Error",
				description: "Failed to delete facility",
				variant: "destructive",
			});
		}
	};

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
							handleOpenModal(
								undefined,
								undefined,
								undefined,
								true
							)
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
							setActiveComponent("Items");
						}}
						onAddFacility={(catId, catName) =>
							handleOpenModal(undefined, catId, catName, false)
						}
						onDeleteFacility={handleDelete}
					/>
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 p-6 h-full overflow-hidden flex flex-col">
				<div className="flex-1 overflow-y-auto">
					{activeComponent === "Items" && selectedFacility ? (
						<FacilityItems facility={selectedFacility} />
					) : (
						<div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
							<Building className="h-12 w-12 mb-4 opacity-20" />
							<p className="text-lg font-medium">
								Select a facility to view content
							</p>
							<p className="text-sm">
								Or add a new facility to get started
							</p>
						</div>
					)}
				</div>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{isAddingCategory
								? "Add New Facility Category"
								: editingFacility
								? "Edit Facility"
								: "Add New Facility"}
						</DialogTitle>
					</DialogHeader>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
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
										? "Category Name"
										: "e.g. Tennis Court"
								}
							/>
						</div>

						{/* Only show manager and description for Categories */}
						{isAddingCategory && (
							<>
								<div className="grid gap-2">
									<Label htmlFor="manager">
										Manager Name
									</Label>
									<Input
										id="manager"
										value={formData.manager}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												manager: e.target.value,
											}))
										}
										required
									/>
								</div>
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
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="description">
										Description (Optional)
									</Label>
									<Input
										id="description"
										value={formData.description}
										onChange={(e) =>
											setFormData((prev) => ({
												...prev,
												description: e.target.value,
											}))
										}
									/>
								</div>
							</>
						)}

						{/* Show full form for Facilities (not categories) */}
						{!isAddingCategory && (
							<>
								{/* Only show category/type selection if creating new AND NOT adding category */}
								{!editingFacility && (
									<div className="grid gap-2">
										<Label htmlFor="type">
											Facility Type (Category)
										</Label>
										<Select
											disabled={true} // Locked to the category passed in
											value={formData.type}
										>
											<SelectTrigger id="type">
												<SelectValue placeholder="Select facility type" />
											</SelectTrigger>
											<SelectContent>
												{categories.map((category) => (
													<SelectItem
														key={category.id}
														value={category.name}
													>
														{category.name}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								)}

								{!editingFacility && (
									<div className="grid gap-2">
										<Label htmlFor="quantity">
											Quantity
										</Label>
										<Input
											id="quantity"
											type="number"
											min="1"
											value={formData.quantity}
											onChange={(e) =>
												setFormData({
													...formData,
													quantity:
														parseInt(
															e.target.value
														) || 0,
												})
											}
											required
											placeholder="How many units?"
										/>
									</div>
								)}

								<div className="grid grid-cols-2 gap-4">
									<div className="grid gap-2">
										<Label htmlFor="capacity">
											Capacity (Per Unit)
										</Label>
										<Input
											id="capacity"
											type="number"
											value={formData.capacity}
											onChange={(e) =>
												setFormData({
													...formData,
													capacity: parseInt(
														e.target.value
													),
												})
											}
											required
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="location">
											Location
										</Label>
										<Input
											id="location"
											value={formData.location}
											onChange={(e) =>
												setFormData({
													...formData,
													location: e.target.value,
												})
											}
											required
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="manager">
											Manager Name
										</Label>
										<Input
											id="manager"
											value={formData.manager}
											onChange={(e) =>
												setFormData({
													...formData,
													manager: e.target.value,
												})
											}
											required
										/>
									</div>
									<div className="grid gap-2">
										<Label htmlFor="description">
											Description (Optional)
										</Label>
										<Input
											id="description"
											value={formData.description}
											onChange={(e) =>
												setFormData({
													...formData,
													description: e.target.value,
												})
											}
										/>
									</div>
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
									: editingFacility
									? "Update"
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
