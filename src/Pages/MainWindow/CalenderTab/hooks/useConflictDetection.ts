import { useMemo } from "react";
import { Booking } from "../types";
import { areIntervalsOverlapping } from "date-fns";

export interface Conflict {
	booking1: Booking;
	booking2: Booking;
	severity: "hard" | "soft"; // hard = same facility, soft = adjacent/related
	message: string;
}

interface UseConflictDetectionReturn {
	conflicts: Conflict[];
	hasConflicts: boolean;
	getConflictsForBooking: (bookingId: string) => Conflict[];
	isBookingConflicting: (bookingId: string) => boolean;
	checkNewBookingConflict: (
		facilityId: string,
		start: Date,
		end: Date,
		excludeBookingId?: string
	) => Conflict[];
}

export const useConflictDetection = (
	bookings: Booking[]
): UseConflictDetectionReturn => {
	// Detect all conflicts between bookings
	const conflicts = useMemo(() => {
		const detectedConflicts: Conflict[] = [];

		for (let i = 0; i < bookings.length; i++) {
			for (let j = i + 1; j < bookings.length; j++) {
				const booking1 = bookings[i];
				const booking2 = bookings[j];

				// Check if times overlap
				const timesOverlap = areIntervalsOverlapping(
					{ start: booking1.start, end: booking1.end },
					{ start: booking2.start, end: booking2.end }
				);

				if (!timesOverlap) continue;

				// Hard conflict: same facility, overlapping times
				if (booking1.facilityId === booking2.facilityId) {
					detectedConflicts.push({
						booking1,
						booking2,
						severity: "hard",
						message: `"${booking1.title}" and "${booking2.title}" overlap in the same facility`,
					});
				}
			}
		}

		return detectedConflicts;
	}, [bookings]);

	const hasConflicts = conflicts.length > 0;

	// Get all conflicts involving a specific booking
	const getConflictsForBooking = (bookingId: string): Conflict[] => {
		return conflicts.filter(
			(c) => c.booking1.id === bookingId || c.booking2.id === bookingId
		);
	};

	// Check if a booking is involved in any conflict
	const isBookingConflicting = (bookingId: string): boolean => {
		return conflicts.some(
			(c) => c.booking1.id === bookingId || c.booking2.id === bookingId
		);
	};

	// Check if a new booking would conflict with existing ones
	const checkNewBookingConflict = (
		facilityId: string,
		start: Date,
		end: Date,
		excludeBookingId?: string
	): Conflict[] => {
		const potentialConflicts: Conflict[] = [];

		const relevantBookings = bookings.filter(
			(b) => b.facilityId === facilityId && b.id !== excludeBookingId
		);

		for (const existing of relevantBookings) {
			const timesOverlap = areIntervalsOverlapping(
				{ start, end },
				{ start: existing.start, end: existing.end }
			);

			if (timesOverlap) {
				potentialConflicts.push({
					booking1: {
						id: "new",
						title: "New Booking",
						facilityId: facilityId,
						start,
						end,
						type: "booking",
						status: "pending",
					} as Booking,
					booking2: existing,
					severity: "hard",
					message: `Conflicts with "${
						existing.title
					}" (${existing.start.toLocaleTimeString()} - ${existing.end.toLocaleTimeString()})`,
				});
			}
		}

		return potentialConflicts;
	};

	return {
		conflicts,
		hasConflicts,
		getConflictsForBooking,
		isBookingConflicting,
		checkNewBookingConflict,
	};
};
