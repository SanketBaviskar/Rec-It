import React, { useRef, useState } from "react";
import {
	format,
	startOfDay,
	endOfDay,
	eachMinuteOfInterval,
	differenceInMinutes,
	isSameDay,
} from "date-fns";
import { Trash2 } from "lucide-react";
import { Facility, Booking } from "../types";
import { useCalendarInteractions } from "../hooks/useCalendarInteractions";

interface DayViewProps {
	currentDate: Date;
	bookings: Booking[];
	facilities: Facility[];
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
	onDeleteBooking: (bookingId: string) => Promise<void>;
	onSlotClick: (date: Date) => void;
	onSlotRangeSelect?: (start: Date, end: Date) => void;
	onEventClick: (booking: Booking) => void;
}

export const DayView: React.FC<DayViewProps> = ({
	currentDate,
	bookings,
	facilities,
	onMoveBooking,
	onResizeBooking,
	onDeleteBooking,
	onSlotRangeSelect,
	onEventClick,
}) => {
	const calendarRef = useRef<HTMLDivElement>(null);
	const [mouseTime, setMouseTime] = useState<Date | null>(null);
	const [mouseY, setMouseY] = useState<number | null>(null);

	const {
		isDragging,
		isCreating,
		creationStart,
		creationEnd,
		draggedBooking,
		localBookings,
		handleDragStart,
		handleResizeStart,
		handleGridMouseDown,
	} = useCalendarInteractions({
		bookings,
		onMoveBooking,
		onResizeBooking,
		onSlotRangeSelect,
		calendarRef,
		currentDate,
	});

	// --- Grouping Logic ---
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

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (calendarRef.current) {
			const rect = calendarRef.current.getBoundingClientRect();
			const scrollTop = calendarRef.current.scrollTop;
			const y = e.clientY - rect.top + scrollTop;
			setMouseY(y);

			const minutes = Math.floor(y / 2);
			const newDate = new Date(currentDate);
			const hours = Math.floor(minutes / 60);
			const mins = minutes % 60;
			newDate.setHours(hours, mins, 0, 0);

			setMouseTime(newDate);
			setMouseTime(newDate);
		}
	};

	// --- Rendering ---
	const renderBooking = (
		booking: Booking,
		dayStart: Date,
		totalWidth: number,
		groupIndex: number,
		totalGroups: number
	) => {
		const facility = facilities.find(
			(f) => f.id.toString() === booking.facility
		);

		const startMinutes = differenceInMinutes(booking.start, dayStart) * 2;
		const duration = differenceInMinutes(booking.end, booking.start) * 2;
		const width = totalWidth / totalGroups - 4;
		const left = 60 + groupIndex * (width + 4);

		return (
			<div
				key={booking.id}
				className={`absolute rounded-md overflow-hidden cursor-move ${
					isDragging && draggedBooking?.id === booking.id
						? "opacity-50"
						: ""
				}`}
				style={{
					top: `${startMinutes}px`,
					height: `${duration}px`,
					left: `${left}px`,
					width: `${width}px`,
					backgroundColor: facility?.color || "#3b82f6",
					cursor: isDragging ? "grabbing" : "grab",
					zIndex:
						isDragging && draggedBooking?.id === booking.id
							? 1000
							: 1,
					border: "1px solid rgba(255,255,255,0.2)",
				}}
				onMouseDown={(e) => handleDragStart(e, booking)}
				onClick={(e) => {
					e.stopPropagation();
					onEventClick(booking);
				}}
			>
				<div className="p-2 h-full flex flex-col justify-between relative">
					<div
						className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize"
						onMouseDown={(e) =>
							handleResizeStart(e, booking, "top")
						}
					/>
					<div>
						<div className="font-bold text-white truncate text-xs">
							{booking.title}
						</div>
						<div className="text-white text-[10px] truncate">
							{facility?.name}
						</div>
						{booking.user && (
							<div className="text-white text-[10px] truncate opacity-80">
								{booking.user.firstName}
							</div>
						)}
					</div>
					<div className="text-white text-[10px]">
						{format(booking.start, "HH:mm")} -{" "}
						{format(booking.end, "HH:mm")}
					</div>
					<div
						className="absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize"
						onMouseDown={(e) =>
							handleResizeStart(e, booking, "bottom")
						}
					/>
				</div>
				<button
					className="absolute top-1 right-1 text-white hover:text-red-500 transition-colors"
					onClick={(e) => {
						e.stopPropagation();
						onDeleteBooking(booking.id);
					}}
				>
					<Trash2 className="h-3 w-3" />
				</button>
			</div>
		);
	};

	const renderGhostBooking = () => {
		if (!isCreating || !creationStart || !creationEnd) return null;

		const dayStart = startOfDay(currentDate);
		const startMinutes = differenceInMinutes(creationStart, dayStart) * 2;
		const duration = differenceInMinutes(creationEnd, creationStart) * 2;

		// Ghost styling
		return (
			<div
				className="absolute rounded-md bg-blue-500/30 border-2 border-blue-500 border-dashed pointer-events-none z-50"
				style={{
					top: `${startMinutes}px`,
					height: `${duration}px`,
					left: "60px",
					right: "10px", // Full width minus time column
				}}
			>
				<div className="p-2 text-xs text-blue-700 font-medium">
					New Booking
					<br />
					{format(creationStart, "HH:mm")} -{" "}
					{format(creationEnd, "HH:mm")}
				</div>
			</div>
		);
	};

	const dayStart = startOfDay(currentDate);
	const dayEnd = endOfDay(currentDate);
	const intervals = eachMinuteOfInterval(
		{ start: dayStart, end: dayEnd },
		{ step: 30 }
	);
	const columnWidth = calendarRef.current
		? calendarRef.current.offsetWidth - 60
		: 200;

	// Note: We use localBookings here to reflect drag updates immediately
	const dayEvents = localBookings.filter((booking) =>
		isSameDay(booking.start, currentDate)
	);
	const eventGroups = groupOverlappingEvents(dayEvents);

	return (
		<div
			className="relative min-h-[1440px]"
			style={{ height: "2880px" }}
			ref={calendarRef}
			onMouseDown={handleGridMouseDown} // Start drag creation
			onMouseMove={handleMouseMove}
		>
			{/* Time grid lines */}
			{intervals.map((interval, index) => (
				<div
					key={index}
					className="absolute left-0 right-0 flex items-start pointer-events-none"
					style={{ top: `${index * 60}px`, height: "60px" }}
				>
					<div
						className="w-14 pr-2 text-right text-sm text-gray-500 dark:text-gray-400"
						style={{ marginTop: "-9px" }}
					>
						{format(interval, "HH:mm")}
					</div>
					<div className="flex-1 border-t border-gray-200 dark:border-gray-700" />
				</div>
			))}

			{/* Time indicator line */}
			{mouseTime && (
				<div
					className="absolute left-0 right-0 flex items-center pointer-events-none"
					style={{
						top: `${mouseY || 0}px`,
						zIndex: 20,
						transform: "translateY(-50%)",
					}}
				>
					<div className="w-14 pr-2 text-right">
						<span className="bg-primary text-primary-foreground text-xs px-1 py-0.5 rounded">
							{format(mouseTime, "HH:mm")}
						</span>
					</div>
					<div className="flex-1 h-px bg-primary" />
				</div>
			)}

			{/* Ghost Booking during creation */}
			{renderGhostBooking()}

			{/* Render bookings */}
			{eventGroups.map((group, groupIndex) =>
				group.map((booking) =>
					renderBooking(
						booking,
						dayStart,
						columnWidth,
						groupIndex,
						eventGroups.length
					)
				)
			)}
		</div>
	);
};
