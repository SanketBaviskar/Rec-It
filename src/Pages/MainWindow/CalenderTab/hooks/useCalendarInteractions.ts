import { useState, useRef, useEffect } from "react";
import { differenceInMinutes, addMinutes } from "date-fns";
import { Booking } from "../types";

interface UseCalendarInteractionsProps {
	bookings: Booking[];
	onMoveBooking: (
		booking: Booking,
		newStart: Date,
		newEnd: Date
	) => Promise<void>;
	onResizeBooking: (
		booking: Booking,
		newStart: Date,
		newEnd: Date
	) => Promise<void>;
	onSlotRangeSelect?: (start: Date, end: Date) => void;
	calendarRef: React.RefObject<HTMLDivElement>;
	currentDate: Date;
}

export const useCalendarInteractions = ({
	bookings,
	onMoveBooking,
	onResizeBooking,
	onSlotRangeSelect,
	calendarRef,
	currentDate,
}: UseCalendarInteractionsProps) => {
	// --- State ---
	const [isDragging, setIsDragging] = useState(false); // Moving an existing event
	const [isResizing, setIsResizing] = useState(false); // Resizing an existing event
	const [isCreating, setIsCreating] = useState(false); // Creating a new event via drag

	const [draggedBooking, setDraggedBooking] = useState<Booking | null>(null);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const [localBookings, setLocalBookings] = useState<Booking[]>(bookings);

	// For creation drag
	const [creationStart, setCreationStart] = useState<Date | null>(null);
	const [creationEnd, setCreationEnd] = useState<Date | null>(null);

	// Sync local state when bookings change (unless dragging/resizing/creating)
	useEffect(() => {
		if (!isDragging && !isResizing && !isCreating) {
			setLocalBookings(bookings);
		}
	}, [bookings, isDragging, isResizing, isCreating]);

	// --- Helper to get time from mouse Y ---
	const getTimeFromY = (y: number) => {
		const minutes = Math.floor(y / 2); // 2px per minute
		const hours = Math.floor(minutes / 60);
		const minutesWithinHour = minutes % 60;
		const snappedMinutes = Math.round(minutesWithinHour / 15) * 15;
		const date = new Date(currentDate);
		date.setHours(hours, snappedMinutes, 0, 0);
		return date;
	};

	// --- Existing Event Drag Logic ---
	const handleDragStart = (e: React.MouseEvent, booking: Booking) => {
		e.stopPropagation();
		e.preventDefault(); // Prevent text selection
		const element = e.currentTarget as HTMLDivElement;
		const rect = element.getBoundingClientRect();
		setDragOffset({
			x: e.clientX - rect.left,
			y: e.clientY - rect.top,
		});
		setDraggedBooking(booking);
		setIsDragging(true);
	};

	// --- Grid Creation Drag Logic ---
	const handleGridMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		if (isDragging || isResizing || !calendarRef.current) return;
		// Don't start creation if clicking on a button or existing event (handled by propagation stop, but good to be safe)

		const rect = calendarRef.current.getBoundingClientRect();
		const scrollTop = calendarRef.current.scrollTop;
		const y = e.clientY - rect.top + scrollTop;

		const startTime = getTimeFromY(y);
		setCreationStart(startTime);
		setCreationEnd(addMinutes(startTime, 30)); // Default 30 min initial
		setIsCreating(true);
	};

	// --- Global Move Logic ---
	const handleGlobalMove = (e: MouseEvent) => {
		if (!calendarRef.current) return;
		const rect = calendarRef.current.getBoundingClientRect();
		const scrollTop = calendarRef.current.scrollTop;
		const y = e.clientY - rect.top + scrollTop;

		if (isDragging && draggedBooking) {
			const dragY = y - dragOffset.y;
			const newStart = getTimeFromY(dragY);

			const duration = differenceInMinutes(
				draggedBooking.end,
				draggedBooking.start
			);
			const newEnd = addMinutes(newStart, duration);

			setLocalBookings((prev) =>
				prev.map((b) =>
					b.id === draggedBooking.id
						? { ...b, start: newStart, end: newEnd }
						: b
				)
			);
		} else if (isCreating && creationStart) {
			let currentDescTime = getTimeFromY(y);
			// Ensure end time is at least 15 mins after start
			if (currentDescTime <= creationStart) {
				currentDescTime = addMinutes(creationStart, 15);
			}
			setCreationEnd(currentDescTime);
		}
	};

	// --- Global Up Logic ---
	const handleGlobalUp = async () => {
		if (isDragging && draggedBooking) {
			const updatedBooking = localBookings.find(
				(b) => b.id === draggedBooking.id
			);
			if (
				updatedBooking &&
				updatedBooking.start.getTime() !==
					draggedBooking.start.getTime()
			) {
				if (window.confirm("Do you want to update this booking?")) {
					await onMoveBooking(
						draggedBooking,
						updatedBooking.start,
						updatedBooking.end
					);
				} else {
					setLocalBookings(bookings); // Revert
				}
			}
			setIsDragging(false);
			setDraggedBooking(null);
		} else if (isCreating && creationStart && creationEnd) {
			setIsCreating(false);
			if (onSlotRangeSelect) {
				onSlotRangeSelect(creationStart, creationEnd);
			}
			setCreationStart(null);
			setCreationEnd(null);
		}
	};

	useEffect(() => {
		if (isDragging || isCreating || isResizing) {
			window.addEventListener("mousemove", handleGlobalMove);
			window.addEventListener("mouseup", handleGlobalUp);
		}
		return () => {
			window.removeEventListener("mousemove", handleGlobalMove);
			window.removeEventListener("mouseup", handleGlobalUp);
		};
	}, [
		isDragging,
		isCreating,
		isResizing,
		draggedBooking,
		localBookings,
		creationStart,
		creationEnd,
	]);

	// --- Resize Logic ---
	const handleResizeStart = (
		e: React.MouseEvent,
		booking: Booking,
		position: "top" | "bottom"
	) => {
		e.stopPropagation();
		e.preventDefault();
		setIsResizing(true);
		const startY = e.clientY;
		const originalStart = booking.start;
		const originalEnd = booking.end;

		const handleResizeMove = (moveEvent: MouseEvent) => {
			const deltaY = moveEvent.clientY - startY;
			const deltaMinutes = Math.round(deltaY / 2 / 15) * 15;

			if (position === "top") {
				const newStart = addMinutes(originalStart, deltaMinutes);
				if (newStart < booking.end) {
					setLocalBookings((prev) =>
						prev.map((b) =>
							b.id === booking.id ? { ...b, start: newStart } : b
						)
					);
				}
			} else {
				const newEnd = addMinutes(originalEnd, deltaMinutes);
				if (newEnd > booking.start) {
					setLocalBookings((prev) =>
						prev.map((b) =>
							b.id === booking.id ? { ...b, end: newEnd } : b
						)
					);
				}
			}
		};

		const handleResizeUp = async (upEvent: MouseEvent) => {
			document.removeEventListener("mousemove", handleResizeMove);
			document.removeEventListener("mouseup", handleResizeUp);
			setIsResizing(false);

			const deltaY = upEvent.clientY - startY;
			const deltaMinutes = Math.round(deltaY / 2 / 15) * 15;
			let newStart = originalStart;
			let newEnd = originalEnd;

			if (position === "top") {
				newStart = addMinutes(originalStart, deltaMinutes);
			} else {
				newEnd = addMinutes(originalEnd, deltaMinutes);
			}

			if (newStart >= newEnd) {
				setLocalBookings(bookings); // Revert
				return;
			}

			await onResizeBooking(booking, newStart, newEnd);
		};

		document.addEventListener("mousemove", handleResizeMove);
		document.addEventListener("mouseup", handleResizeUp);
	};

	return {
		isDragging,
		isCreating,
		creationStart,
		creationEnd,
		draggedBooking,
		localBookings,
		handleDragStart,
		handleResizeStart,
		handleGridMouseDown,
	};
};
