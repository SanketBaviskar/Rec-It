import React, { useRef, useState } from "react";
import {
	format,
	startOfWeek,
	addDays,
	startOfDay,
	differenceInMinutes,
	isSameDay,
	eachMinuteOfInterval,
	endOfDay,
} from "date-fns";
import { Trash2 } from "lucide-react";
import { Facility, Booking } from "../types";

interface WeekViewProps {
	currentDate: Date;
	bookings: Booking[];
	facilities: Facility[];
	onMoveBooking?: (
		booking: Booking,
		newStart: Date,
		newEnd: Date
	) => Promise<void>;
	onSlotClick?: (date: Date) => void;
	onSlotRangeSelect?: (start: Date, end: Date) => void;
	onEventClick: (booking: Booking) => void;
	onDeleteBooking: (bookingId: string) => Promise<void>;
	isBookingConflicting?: (bookingId: string) => boolean;
}

export const WeekView: React.FC<WeekViewProps> = ({
	currentDate,
	bookings,
	facilities,
	onSlotRangeSelect,
	onEventClick,
	onDeleteBooking,
	isBookingConflicting,
}) => {
	const calendarRef = useRef<HTMLDivElement>(null);
	const [isCreating, setIsCreating] = useState(false);
	const [creationStart, setCreationStart] = useState<Date | null>(null);
	const [creationEnd, setCreationEnd] = useState<Date | null>(null);
	const [creationDayIndex, setCreationDayIndex] = useState<number | null>(
		null
	);

	// Get week days
	const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 }); // Sunday start
	const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

	// Time slots (30-min intervals for the grid)
	const dayStart = startOfDay(currentDate);
	const dayEnd = endOfDay(currentDate);
	const intervals = eachMinuteOfInterval(
		{ start: dayStart, end: dayEnd },
		{ step: 30 }
	);

	// Helper to calculate position from time
	const getTopPosition = (date: Date, dayRef: Date): number => {
		const dayStartRef = startOfDay(dayRef);
		return differenceInMinutes(date, dayStartRef) * 2; // 2px per minute
	};

	// Get bookings for a specific day
	const getBookingsForDay = (day: Date): Booking[] => {
		return bookings.filter((booking) => isSameDay(booking.start, day));
	};

	// Group overlapping events for a day
	const groupOverlappingEvents = (events: Booking[]) => {
		const sortedEvents = events.sort(
			(a, b) => a.start.getTime() - b.start.getTime()
		);
		const groups: Booking[][] = [];

		for (const event of sortedEvents) {
			let added = false;
			for (const group of groups) {
				if (
					!group.some(
						(groupEvent) =>
							event.start < groupEvent.end &&
							event.end > groupEvent.start
					)
				) {
					group.push(event);
					added = true;
					break;
				}
			}
			if (!added) {
				groups.push([event]);
			}
		}
		return groups;
	};

	// Handle mouse down on grid for creating new booking
	const handleGridMouseDown = (
		e: React.MouseEvent,
		dayIndex: number,
		day: Date
	) => {
		if (e.button !== 0) return; // Only left click
		if ((e.target as HTMLElement).closest(".booking-event")) return; // Don't start if clicking on booking

		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const scrollTop = calendarRef.current?.scrollTop || 0;
		const y = e.clientY - rect.top + scrollTop;
		const minutes = Math.floor(y / 2);
		const snappedMinutes = Math.floor(minutes / 15) * 15; // Snap to 15-min intervals

		const startDate = new Date(day);
		startDate.setHours(
			Math.floor(snappedMinutes / 60),
			snappedMinutes % 60,
			0,
			0
		);

		setIsCreating(true);
		setCreationStart(startDate);
		setCreationEnd(new Date(startDate.getTime() + 30 * 60 * 1000)); // Default 30 min
		setCreationDayIndex(dayIndex);

		e.preventDefault();
	};

	// Handle mouse move during creation
	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isCreating || creationStart === null || creationDayIndex === null)
			return;

		const dayColumn =
			document.querySelectorAll(".week-day-column")[creationDayIndex];
		if (!dayColumn) return;

		const rect = dayColumn.getBoundingClientRect();
		const scrollTop = calendarRef.current?.scrollTop || 0;
		const y = e.clientY - rect.top + scrollTop;
		const minutes = Math.floor(y / 2);
		const snappedMinutes = Math.floor(minutes / 15) * 15;

		const endDate = new Date(weekDays[creationDayIndex]);
		endDate.setHours(
			Math.floor(snappedMinutes / 60),
			snappedMinutes % 60,
			0,
			0
		);

		// Ensure end is after start
		if (endDate > creationStart) {
			setCreationEnd(endDate);
		}
	};

	// Handle mouse up to finish creation
	const handleMouseUp = () => {
		if (isCreating && creationStart && creationEnd && onSlotRangeSelect) {
			onSlotRangeSelect(creationStart, creationEnd);
		}
		setIsCreating(false);
		setCreationStart(null);
		setCreationEnd(null);
		setCreationDayIndex(null);
	};

	// Render a single booking
	const renderBooking = (
		booking: Booking,
		day: Date,
		groupIndex: number,
		totalGroups: number,
		columnWidth: number
	) => {
		const facility = facilities.find(
			(f) => f.id.toString() === booking.facility
		);
		const hasConflict = isBookingConflicting?.(booking.id) ?? false;

		const top = getTopPosition(booking.start, day);
		const height = differenceInMinutes(booking.end, booking.start) * 2;
		const width = (columnWidth - 8) / totalGroups;
		const left = groupIndex * width;

		return (
			<div
				key={booking.id}
				className={`booking-event absolute rounded-md overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow ${
					hasConflict ? "ring-2 ring-red-500 ring-offset-1" : ""
				}`}
				style={{
					top: `${top}px`,
					height: `${Math.max(height, 24)}px`,
					left: `${left + 4}px`,
					width: `${width - 4}px`,
					backgroundColor: hasConflict
						? "#ef4444"
						: facility?.color || "#3b82f6",
					zIndex: 10,
					border: hasConflict
						? "2px solid #dc2626"
						: "1px solid rgba(255,255,255,0.2)",
				}}
				onClick={(e) => {
					e.stopPropagation();
					onEventClick(booking);
				}}
			>
				<div className="p-1 h-full flex flex-col relative">
					<div className="font-medium text-white text-[10px] truncate">
						{booking.title}
					</div>
					{height > 40 && (
						<>
							<div className="text-white/80 text-[9px] truncate">
								{facility?.name}
							</div>
							<div className="text-white/70 text-[9px]">
								{format(booking.start, "HH:mm")}
							</div>
						</>
					)}
					<button
						className="absolute top-0.5 right-0.5 text-white/60 hover:text-red-300 transition-colors"
						onClick={(e) => {
							e.stopPropagation();
							onDeleteBooking(booking.id);
						}}
					>
						<Trash2 className="h-2.5 w-2.5" />
					</button>
				</div>
			</div>
		);
	};

	// Render ghost booking during creation
	const renderGhostBooking = (dayIndex: number) => {
		if (
			!isCreating ||
			!creationStart ||
			!creationEnd ||
			creationDayIndex !== dayIndex
		) {
			return null;
		}

		const day = weekDays[dayIndex];
		const top = getTopPosition(creationStart, day);
		const height = differenceInMinutes(creationEnd, creationStart) * 2;

		return (
			<div
				className="absolute rounded-md bg-blue-500/30 border-2 border-blue-500 border-dashed pointer-events-none z-50"
				style={{
					top: `${top}px`,
					height: `${Math.max(height, 30)}px`,
					left: "4px",
					right: "4px",
				}}
			>
				<div className="p-1 text-[10px] text-blue-700 dark:text-blue-300 font-medium">
					New Booking
					<br />
					{format(creationStart, "HH:mm")} -{" "}
					{format(creationEnd, "HH:mm")}
				</div>
			</div>
		);
	};

	return (
		<div
			ref={calendarRef}
			className="flex flex-col h-full overflow-auto"
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
		>
			{/* Header with day names */}
			<div className="flex border-b bg-muted/30 sticky top-0 z-20">
				<div className="w-14 shrink-0" /> {/* Time column spacer */}
				{weekDays.map((day, index) => {
					const isToday = isSameDay(day, new Date());
					return (
						<div
							key={index}
							className={`flex-1 text-center py-3 border-l ${
								isToday ? "bg-primary/10" : ""
							}`}
						>
							<div className="text-xs text-muted-foreground uppercase">
								{format(day, "EEE")}
							</div>
							<div
								className={`text-lg font-semibold ${
									isToday
										? "bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mx-auto"
										: ""
								}`}
							>
								{format(day, "d")}
							</div>
						</div>
					);
				})}
			</div>

			{/* Time grid */}
			<div className="flex flex-1 relative" style={{ height: "2880px" }}>
				{/* Time labels column */}
				<div className="w-14 shrink-0">
					{intervals.map((interval, index) => (
						<div
							key={index}
							className="h-[60px] text-right pr-2 text-xs text-muted-foreground"
							style={{ marginTop: index === 0 ? "0" : "-9px" }}
						>
							{format(interval, "HH:mm")}
						</div>
					))}
				</div>

				{/* Day columns */}
				{weekDays.map((day, dayIndex) => {
					const dayBookings = getBookingsForDay(day);
					const eventGroups = groupOverlappingEvents(dayBookings);
					const isToday = isSameDay(day, new Date());

					return (
						<div
							key={dayIndex}
							className={`week-day-column flex-1 relative border-l ${
								isToday ? "bg-primary/5" : ""
							}`}
							onMouseDown={(e) =>
								handleGridMouseDown(e, dayIndex, day)
							}
						>
							{/* Grid lines */}
							{intervals.map((_, index) => (
								<div
									key={index}
									className="absolute left-0 right-0 border-t border-muted/50"
									style={{
										top: `${index * 60}px`,
										height: "60px",
									}}
								/>
							))}

							{/* Bookings */}
							{eventGroups.map((group, groupIndex) =>
								group.map((booking) =>
									renderBooking(
										booking,
										day,
										groupIndex,
										eventGroups.length,
										100 // Will calculate actual width
									)
								)
							)}

							{/* Ghost booking during creation */}
							{renderGhostBooking(dayIndex)}
						</div>
					);
				})}
			</div>
		</div>
	);
};
