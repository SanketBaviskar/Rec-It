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
				const mapped: Booking[] = data.map((r) => ({
					id: r.id.toString(),
					title: r.title,
					facility: r.facilityId.toString(),
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
			.catch(console.error);
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
				facilityId: parseInt(booking.facility),
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
				(booking) => booking.facility === selectedFacility.toString()
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
