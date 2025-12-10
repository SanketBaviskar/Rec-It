import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, MapPin, Users, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
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
import { fetchFacilities, Facility } from "@/Services/Api/Facility/facilityApi";
import {
	addFacility,
	CreateFacilityDto,
} from "@/Services/Api/Admin/Facility/addFacility";
import {
	getFacilityCategories,
	FacilityCategory,
} from "@/services/Api/FacilityCategory/facilityCategoryApi";
import { updateFacility } from "@/Services/Api/Admin/Facility/updateFacility";
import { deleteFacility } from "@/Services/Api/Admin/Facility/deleteFacility";

export default function FacilityManagementTab() {
	const { toast } = useToast();
	const [facilities, setFacilities] = useState<Facility[]>([]);
	const [categories, setCategories] = useState<FacilityCategory[]>([]);
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
		type: "Court", // Default
	});

	const loadFacilities = async () => {
		try {
			const [facilitiesData, categoriesData] = await Promise.all([
				fetchFacilities(),
				getFacilityCategories(),
			]);
			setFacilities(facilitiesData);
			setCategories(categoriesData);
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to load facilities",
				variant: "destructive",
			});
		}
	};

	useEffect(() => {
		loadFacilities();
	}, []);

	const handleOpenModal = (facility?: Facility) => {
		if (facility) {
			setEditingFacility(facility);
			setFormData({
				name: facility.name,
				description: facility.description || "",
				capacity: facility.capacity,
				location: facility.location,
				manager: facility.manager,
				type: facility.type || "Court",
			});
		} else {
			setEditingFacility(null);
			setFormData({
				name: "",
				description: "",
				capacity: 0,
				location: "",
				manager: "",
				type: "Court",
			});
		}
		setIsModalOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			if (editingFacility) {
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
		} catch (error) {
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
		if (confirm("Are you sure you want to delete this facility?")) {
			try {
				await deleteFacility(id);
				toast({
					title: "Deleted",
					description: "Facility deleted successfully",
				});
				loadFacilities();
			} catch (error) {
				toast({
					title: "Error",
					description: "Failed to delete facility",
					variant: "destructive",
				});
			}
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						Facility Management
					</h2>
					<p className="text-muted-foreground">
						Manage your courts, pools, and studios.
					</p>
				</div>
				<Button onClick={() => handleOpenModal()}>
					<Plus className="mr-2 h-4 w-4" /> Add Facility
				</Button>
			</div>

			<div className="bg-card rounded-md border shadow-sm">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Location</TableHead>
							<TableHead>Capacity</TableHead>
							<TableHead>Manager</TableHead>
							<TableHead className="text-right">
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{facilities.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={6}
									className="text-center h-24 text-muted-foreground"
								>
									No facilities found. Add one to get started.
								</TableCell>
							</TableRow>
						) : (
							facilities.map((facility) => (
								<TableRow key={facility.id}>
									<TableCell className="font-medium">
										<div className="flex flex-col">
											<span>{facility.name}</span>
											{facility.description && (
												<span className="text-xs text-muted-foreground truncate max-w-[200px]">
													{facility.description}
												</span>
											)}
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<Building className="h-3 w-3 text-muted-foreground" />
											{facility.type}
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<MapPin className="h-3 w-3 text-muted-foreground" />
											{facility.location}
										</div>
									</TableCell>
									<TableCell>
										<div className="flex items-center gap-1">
											<Users className="h-3 w-3 text-muted-foreground" />
											{facility.capacity}
										</div>
									</TableCell>
									<TableCell>{facility.manager}</TableCell>
									<TableCell className="text-right">
										<Button
											variant="ghost"
											size="icon"
											onClick={() =>
												handleOpenModal(facility)
											}
										>
											<Pencil className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											className="text-destructive hover:text-destructive"
											onClick={() =>
												handleDelete(facility.id)
											}
										>
											<Trash2 className="h-4 w-4" />
										</Button>
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</div>

			<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{editingFacility
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
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="type">Facility Type</Label>
							<Select
								value={formData.type}
								onValueChange={(value) =>
									setFormData({ ...formData, type: value })
								}
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
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="capacity">Capacity</Label>
								<Input
									id="capacity"
									type="number"
									value={formData.capacity}
									onChange={(e) =>
										setFormData({
											...formData,
											capacity: parseInt(e.target.value),
										})
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
										setFormData({
											...formData,
											location: e.target.value,
										})
									}
									required
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="manager">Manager Name</Label>
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
									: "Add Facility"}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	);
}
