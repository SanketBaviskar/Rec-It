import { useState, useEffect } from "react";
import { format, addDays, addMinutes } from "date-fns";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Facility, Booking } from "./types";
import { SearchBar } from "@/components/SearchBar/SearchBar";
import {
	createReservation,
	updateReservation,
	CreateReservationDto,
} from "@/services/Api/Reservation/reservationApi";
import { useToast } from "@/components/ui/hooks/use-toast";

interface BookingFormProps {
	selectedDate: Date;
	initialRange?: { start: Date; end: Date } | null;
	facilities: Facility[];
	selectedFacility?: string;
	onBook: () => void;
	onClose: () => void;
	editingBooking: Booking | null;
}

export function BookingForm({
	selectedDate,
	initialRange,
	facilities,
	selectedFacility,
	onBook,
	onClose,
	editingBooking,
}: BookingFormProps) {
	const { toast } = useToast();
	const [selectedUser, setSelectedUser] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Initial form state
	const [formData, setFormData] = useState({
		title: "",
		facility:
			selectedFacility || (facilities.length > 0 ? facilities[0].id : ""),
		startTime: format(selectedDate, "HH:mm"),
		endTime: format(addMinutes(selectedDate, 60), "HH:mm"),
		type: "booking" as Booking["type"],
		description: "",
		attendees: "",
		instructor: "",
		isRecurring: false,
		recurringFrequency: "weekly" as "daily" | "weekly" | "monthly",
		recurringEndDate: format(addDays(selectedDate, 90), "yyyy-MM-dd"),
	});

	useEffect(() => {
		if (editingBooking) {
			setFormData({
				title: editingBooking.title,
				facility: editingBooking.facility,
				startTime: format(editingBooking.start, "HH:mm"),
				endTime: format(editingBooking.end, "HH:mm"),
				type: editingBooking.type,
				description: editingBooking.description || "",
				attendees: editingBooking.attendees?.toString() || "",
				instructor: editingBooking.instructor || "",
				isRecurring: !!editingBooking.recurring,
				recurringFrequency:
					editingBooking.recurring?.frequency || "weekly",
				recurringEndDate: editingBooking.recurring
					? format(editingBooking.recurring.endDate, "yyyy-MM-dd")
					: format(addDays(selectedDate, 90), "yyyy-MM-dd"),
			});
			if (editingBooking.user) {
				setSelectedUser({
					id: editingBooking.userId,
					firstName: editingBooking.user.firstName,
					lastName: editingBooking.user.lastName,
				});
			}
		} else {
			// New booking
			const baseState: any = {};

			// If we have an initial range (from drag), use it
			if (initialRange) {
				baseState.startTime = format(initialRange.start, "HH:mm");
				baseState.endTime = format(initialRange.end, "HH:mm");
			} else if (selectedDate) {
				// Fallback to selectedDate (usually just clicked slot start)
				// If selectedDate changed, update times if not from simple toggle
				baseState.startTime = format(selectedDate, "HH:mm");
				baseState.endTime = format(
					addMinutes(selectedDate, 60),
					"HH:mm"
				);
			}

			if (selectedFacility) {
				baseState.facility = selectedFacility;
			}

			setFormData((prev) => ({
				...prev,
				...baseState,
			}));
		}
	}, [
		editingBooking,
		selectedFacility,
		selectedDate,
		facilities,
		initialRange,
	]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const [startHours, startMinutes] = formData.startTime
				.split(":")
				.map(Number);
			const [endHours, endMinutes] = formData.endTime
				.split(":")
				.map(Number);

			const start = new Date(selectedDate);
			start.setHours(startHours, startMinutes, 0, 0);

			const end = new Date(selectedDate);
			end.setHours(endHours, endMinutes, 0, 0);

			// Construct DTO
			const dto: CreateReservationDto = {
				facilityId: parseInt(formData.facility),
				title: formData.title,
				startTime: start.toISOString(),
				endTime: end.toISOString(),
				type: formData.type,
				description: formData.description,
				attendees: formData.attendees
					? parseInt(formData.attendees)
					: undefined,
				userId: selectedUser ? parseInt(selectedUser.id) : undefined,
			};

			if (!selectedUser) {
				toast({
					title: "Error",
					description: "Please select an assigned member",
					variant: "destructive",
				});
				return;
			}

			if (!dto.facilityId) {
				toast({
					title: "Error",
					description: "Please select a facility",
					variant: "destructive",
				});
				return;
			}

			if (editingBooking) {
				await updateReservation(parseInt(editingBooking.id), dto);
				toast({
					title: "Updated",
					description: "Reservation updated successfully",
				});
			} else {
				await createReservation(dto);
				toast({
					title: "Created",
					description: "Reservation created successfully",
				});
			}

			onBook();
			onClose();
		} catch (error: any) {
			console.error(error);
			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to save booking. Check for conflicts.",
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			{/* User Selection */}
			<div className="space-y-2">
				<Label>
					Assigned Member <span className="text-red-500">*</span>
				</Label>
				<SearchBar
					onSelect={(u) => setSelectedUser(u)}
					onClear={() => setSelectedUser(null)}
					placeholder="Search for a member..."
					className="w-full"
					initialValue={
						selectedUser
							? `${selectedUser.firstName} ${selectedUser.lastName}`
							: ""
					}
				/>
			</div>

			<div>
				<Label
					htmlFor="title"
					className="block text-sm font-medium text-foreground mb-1"
				>
					Title
				</Label>
				<Input
					id="title"
					value={formData.title}
					onChange={(e) =>
						setFormData({ ...formData, title: e.target.value })
					}
				/>
			</div>

			<div>
				<Label
					htmlFor="facility"
					className="block text-sm font-medium text-foreground mb-1"
				>
					Facility <span className="text-red-500">*</span>
				</Label>
				<Select
					value={formData.facility.toString()}
					onValueChange={(value) =>
						setFormData({ ...formData, facility: value })
					}
				>
					<SelectTrigger id="facility">
						<SelectValue placeholder="Select a facility" />
					</SelectTrigger>
					<SelectContent>
						{facilities.map((facility) => (
							<SelectItem
								key={facility.id}
								value={facility.id.toString()}
							>
								{facility.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<div>
					<Label
						htmlFor="startTime"
						className="block text-sm font-medium text-foreground mb-1"
					>
						Start Time <span className="text-red-500">*</span>
					</Label>
					<Input
						id="startTime"
						type="time"
						required
						value={formData.startTime}
						onChange={(e) =>
							setFormData({
								...formData,
								startTime: e.target.value,
							})
						}
					/>
				</div>
				<div>
					<Label
						htmlFor="endTime"
						className="block text-sm font-medium text-foreground mb-1"
					>
						End Time <span className="text-red-500">*</span>
					</Label>
					<Input
						id="endTime"
						type="time"
						required
						value={formData.endTime}
						onChange={(e) =>
							setFormData({
								...formData,
								endTime: e.target.value,
							})
						}
					/>
				</div>
			</div>

			<div>
				<Label
					htmlFor="type"
					className="block text-sm font-medium text-foreground mb-1"
				>
					Type
				</Label>
				<Select
					value={formData.type}
					onValueChange={(value) =>
						setFormData({
							...formData,
							type: value as Booking["type"],
						})
					}
				>
					<SelectTrigger id="type">
						<SelectValue placeholder="Select booking type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="booking">Booking</SelectItem>
						<SelectItem value="maintenance">Maintenance</SelectItem>
						<SelectItem value="event">Event</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div>
				<Label
					htmlFor="description"
					className="block text-sm font-medium text-foreground mb-1"
				>
					Description
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

			<div>
				<Label
					htmlFor="attendees"
					className="block text-sm font-medium text-foreground mb-1"
				>
					Attendees
				</Label>
				<Input
					id="attendees"
					type="number"
					value={formData.attendees}
					onChange={(e) =>
						setFormData({ ...formData, attendees: e.target.value })
					}
				/>
			</div>

			<div className="flex justify-end space-x-2 pt-4">
				<Button
					type="button"
					variant="outline"
					onClick={onClose}
					disabled={isLoading}
				>
					Cancel
				</Button>
				<Button type="submit" disabled={isLoading}>
					{isLoading
						? "Saving..."
						: editingBooking
						? "Update"
						: "Book"}
				</Button>
			</div>
		</form>
	);
}
