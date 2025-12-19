import { useState, useCallback, useEffect } from "react";
import { startOfMonth, endOfMonth, parseISO } from "date-fns";
import { Booking } from "../types";
import {
	fetchReservations,
	updateReservation,
	deleteReservation,
} from "@/services/Api/Reservation/reservationApi";
import { useToast } from "@/components/ui/hooks/use-toast";

export const useReservations = (
	currentDate: Date,
	selectedFacility: string | undefined
) => {
	const { toast } = useToast();
	const [bookings, setBookings] = useState<Booking[]>([]);

	const loadReservations = useCallback(() => {
		const start = startOfMonth(currentDate);
		const end = endOfMonth(currentDate);

		fetchReservations(
			selectedFacility ? parseInt(selectedFacility) : undefined,
			start,
			end
		)
			.then((data) => {
				// Add null safety - if data is undefined or not an array, use empty array
				if (!data || !Array.isArray(data)) {
					console.warn(
						"Reservations API returned invalid data:",
						data
					);
					setBookings([]);
					return;
				}
				const mapped: Booking[] = data.map((r) => ({
					id: r.id.toString(),
					title: r.title,
					facilityItemId: r.facilityItemId.toString(),
					// Support for backward compatibility processing if needed, but primary is now item
					facilityItem: r.facilityItem
						? {
								id: r.facilityItem.id.toString(),
								facilityId:
									r.facilityItem.facility.id.toString(), // Map nested facility ID
								name: r.facilityItem.name,
								status: r.facilityItem.status as
									| "available"
									| "maintenance"
									| "closed",
								facility: {
									id: r.facilityItem.facility.id.toString(),
									name: r.facilityItem.facility.name,
									type: r.facilityItem.facility.type,
									capacity: 0, // Not always returned here, simple mapping
									location: r.facilityItem.facility.location,
								},
						  }
						: undefined,
					start: parseISO(r.startTime),
					end: parseISO(r.endTime),
					type: r.type,
					status: r.status,
					description: r.description,
					attendees: r.attendees,
					userId: r.userId || undefined,
					user: r.user,
					createdAt: parseISO(r.createdAt),
				}));
				setBookings(mapped);
			})
			.catch((err) => {
				console.error("Error loading reservations:", err);
				setBookings([]);
			});
	}, [currentDate, selectedFacility]);

	useEffect(() => {
		loadReservations();
	}, [loadReservations]);

	const handleUpdateBooking = async (
		booking: Booking,
		newStart: Date,
		newEnd: Date
	) => {
		try {
			await updateReservation(parseInt(booking.id), {
				startTime: newStart.toISOString(),
				endTime: newEnd.toISOString(),
				facilityItemId: parseInt(booking.facilityItemId),
			});
			toast({
				title: "Updated",
				description: "Booking updated successfully.",
			});
			loadReservations();
		} catch (error) {
			console.error("Update failed:", error);
			toast({
				title: "Error",
				description: "Failed to update booking.",
				variant: "destructive",
			});
			loadReservations();
		}
	};

	const handleDeleteBooking = async (bookingId: string) => {
		if (confirm("Are you sure you want to delete this booking?")) {
			try {
				await deleteReservation(parseInt(bookingId));
				setBookings((prev) => prev.filter((b) => b.id !== bookingId));
				toast({ title: "Deleted", description: "Booking deleted." });
			} catch (error) {
				console.error("Delete failed:", error);
				toast({
					title: "Error",
					description: "Failed to delete booking.",
					variant: "destructive",
				});
			}
		}
	};

	const filteredBookings = selectedFacility
		? bookings.filter(
				(booking) =>
					booking.facilityItemId === selectedFacility.toString()
		  )
		: bookings;

	return {
		bookings,
		filteredBookings,
		loadReservations,
		handleUpdateBooking,
		handleDeleteBooking,
	};
};
