import { useState, useEffect } from "react";
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/hooks/use-toast";

import { createSpace, updateSpace, Space } from "@/services/Api/Space/spaceApi";
import { createZone, updateZone, Zone } from "@/services/Api/Zone/zoneApi";

interface SpaceFormDialogProps {
	isOpen: boolean;
	onClose: () => void;
	isAddingZone: boolean;
	activeZoneId: number | null;
	activeZoneName: string;
	onSuccess: () => void;
	initialData?: Partial<Space> | Partial<Zone> | null;
}

export default function SpaceFormDialog({
	isOpen,
	onClose,
	isAddingZone,
	activeZoneId,
	activeZoneName,
	onSuccess,
	initialData,
}: SpaceFormDialogProps) {
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		location: "",
		capacity: 0,
		status: "available",
		rules: "",
		timings: "",
	});

	// Reset form
	useEffect(() => {
		if (isOpen) {
			if (initialData) {
				setFormData({
					name: initialData.name || "",
					description: initialData.description || "",
					location: (initialData as Space).location || "",
					capacity: (initialData as Space).capacity || 0,
					status: (initialData as Space).status || "available",
					rules: (initialData as any).rules || "", // Both Zone and Space have rules
					timings: (initialData as any).timings || "", // Both have timings
				});
			} else {
				setFormData({
					name: "",
					description: "",
					location: "",
					capacity: 0,
					status: "available",
					rules: "",
					timings: "",
				});
			}
		}
	}, [isOpen, initialData]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (isAddingZone) {
				if (initialData?.id) {
					await updateZone(initialData.id, {
						name: formData.name,
						description: formData.description,
						rules: formData.rules,
						timings: formData.timings,
					});
					toast({
						title: "Updated",
						description: "Zone updated successfully",
					});
				} else {
					await createZone({
						name: formData.name,
						description: formData.description,
						rules: formData.rules,
						timings: formData.timings,
					});
					toast({
						title: "Created",
						description: "Zone created successfully",
					});
				}
			} else if (activeZoneId) {
				if (initialData?.id) {
					await updateSpace(initialData.id, {
						name: formData.name,
						description: formData.description,
						location: formData.location || undefined,
						capacity: formData.capacity || undefined,
						status: formData.status,
						rules: formData.rules,
						timings: formData.timings,
					});
					toast({
						title: "Updated",
						description: "Space updated successfully",
					});
				} else {
					await createSpace({
						zoneId: activeZoneId,
						name: formData.name,
						description: formData.description,
						location: formData.location || undefined,
						capacity: formData.capacity || undefined,
						status: formData.status,
						rules: formData.rules,
						timings: formData.timings,
					});
					toast({
						title: "Created",
						description: "Space created successfully",
					});
				}
			}
			onSuccess();
			onClose();
		} catch (error) {
			console.error(error);
			toast({
				title: "Error",
				description: "Operation failed",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
			<DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>
						{initialData
							? isAddingZone
								? "Edit Zone"
								: "Edit Space"
							: isAddingZone
							? "Add New Zone"
							: `Add Space to ${activeZoneName}`}
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
								isAddingZone
									? 'e.g., "Aquatics", "Courts"'
									: 'e.g., "Lap Pool", "Court 1"'
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

					{/* Only show location, capacity, status for spaces */}
					{!isAddingZone && (
						<div className="space-y-4">
							<div className="grid grid-cols-2 gap-4">
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
										placeholder="e.g., Floor 1"
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
										placeholder="Max occupancy"
									/>
								</div>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="status">Status</Label>
								<Select
									value={formData.status}
									onValueChange={(value) =>
										setFormData((prev) => ({
											...prev,
											status: value,
										}))
									}
								>
									<SelectTrigger id="status">
										<SelectValue placeholder="Select status" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="available">
											Available
										</SelectItem>
										<SelectItem value="occupied">
											Occupied
										</SelectItem>
										<SelectItem value="maintenance">
											Maintenance
										</SelectItem>
										<SelectItem value="closed">
											Closed
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					)}

					{/* Rules and Timings for both Zones and Spaces */}
					<div className="grid gap-2">
						<Label htmlFor="rules">Rules & Regulations</Label>
						<Textarea
							id="rules"
							value={formData.rules}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									rules: e.target.value,
								}))
							}
							placeholder="e.g., No food, Max session 1 hr"
							rows={2}
						/>
					</div>

					<div className="grid gap-2">
						<Label htmlFor="timings">Access Hours / Timings</Label>
						<Textarea
							id="timings"
							value={formData.timings}
							onChange={(e) =>
								setFormData((prev) => ({
									...prev,
									timings: e.target.value,
								}))
							}
							placeholder="e.g., Mon-Fri: 6am-10pm"
							rows={2}
						/>
					</div>

					<div className="flex justify-end gap-2 pt-4">
						<Button
							type="button"
							variant="outline"
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading
								? "Saving..."
								: initialData
								? "Save Changes"
								: isAddingZone
								? "Add Zone"
								: "Add Space"}
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
