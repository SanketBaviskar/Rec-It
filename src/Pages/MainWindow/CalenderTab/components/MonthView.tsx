import React from "react";
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	isSameMonth,
	isSameDay,
	isToday,
} from "date-fns";
import { Facility, Booking } from "../types";

interface MonthViewProps {
	currentDate: Date;
	bookings: Booking[];
	facilities: Facility[];
	onDayClick: (date: Date) => void;
	onEventClick: (booking: Booking) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({
	currentDate,
	bookings,
	facilities,
	onDayClick,
	onEventClick,
}) => {
	// Get month boundaries
	const monthStart = startOfMonth(currentDate);
	const monthEnd = endOfMonth(currentDate);
	const calendarStart = startOfWeek(monthStart, { weekStartsOn: 0 });
	const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });

	// Generate all days to display
	const days: Date[] = [];
	let day = calendarStart;
	while (day <= calendarEnd) {
		days.push(day);
		day = addDays(day, 1);
	}

	// Get bookings for a specific day
	const getBookingsForDay = (date: Date): Booking[] => {
		return bookings.filter((booking) => isSameDay(booking.start, date));
	};

	// Get facility color
	const getFacilityColor = (facilityId: string): string => {
		const facility = facilities.find((f) => f.id.toString() === facilityId);
		return facility?.color || "#3b82f6";
	};

	// Week day headers
	const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

	return (
		<div className="flex flex-col h-full">
			{/* Week day headers */}
			<div className="grid grid-cols-7 border-b bg-muted/30">
				{weekDays.map((dayName, index) => (
					<div
						key={index}
						className="py-3 text-center text-sm font-medium text-muted-foreground border-r last:border-r-0"
					>
						{dayName}
					</div>
				))}
			</div>

			{/* Calendar grid */}
			<div className="flex-1 grid grid-cols-7 auto-rows-fr">
				{days.map((date, index) => {
					const dayBookings = getBookingsForDay(date);
					const isCurrentMonth = isSameMonth(date, currentDate);
					const isTodayDate = isToday(date);
					const maxVisibleEvents = 3;
					const hiddenCount = Math.max(
						0,
						dayBookings.length - maxVisibleEvents
					);

					return (
						<div
							key={index}
							className={`border-r border-b p-1 min-h-[100px] cursor-pointer hover:bg-muted/30 transition-colors ${
								!isCurrentMonth ? "bg-muted/10" : ""
							} ${isTodayDate ? "bg-primary/5" : ""}`}
							onClick={() => onDayClick(date)}
						>
							{/* Day number */}
							<div className="flex justify-between items-start mb-1">
								<span
									className={`text-sm font-medium ${
										!isCurrentMonth
											? "text-muted-foreground/50"
											: isTodayDate
											? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center"
											: "text-foreground"
									}`}
								>
									{format(date, "d")}
								</span>
								{dayBookings.length > 0 && (
									<span className="text-[10px] text-muted-foreground px-1 bg-muted rounded">
										{dayBookings.length}
									</span>
								)}
							</div>

							{/* Event tiles */}
							<div className="space-y-0.5">
								{dayBookings
									.slice(0, maxVisibleEvents)
									.map((booking) => (
										<div
											key={booking.id}
											className="text-[10px] px-1 py-0.5 rounded truncate text-white cursor-pointer hover:opacity-80 transition-opacity"
											style={{
												backgroundColor:
													getFacilityColor(
														booking.facility
													),
											}}
											onClick={(e) => {
												e.stopPropagation();
												onEventClick(booking);
											}}
										>
											{format(booking.start, "HH:mm")}{" "}
											{booking.title}
										</div>
									))}
								{hiddenCount > 0 && (
									<div className="text-[10px] text-muted-foreground px-1">
										+{hiddenCount} more
									</div>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
