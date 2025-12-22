import React, { useState } from "react";
import { format, differenceInMinutes } from "date-fns";
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Users,
	BookOpen,
	Clock,
	PenToolIcon as Tool,
	CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "../types";
import { Separator } from "@/components/ui/separator";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./SidebarCalendar.css";

interface HeaderProps {
	currentDate: Date;
	bookings: Booking[];
	onPreviousDay: () => void;
	onNextDay: () => void;
	onToday: () => void;
	onNewBooking: () => void;
	onDateSelect?: (date: Date) => void;
}

export const Header: React.FC<HeaderProps> = ({
	currentDate,
	bookings,
	onPreviousDay,
	onNextDay,
	onToday,
	onNewBooking,
	onDateSelect,
}) => {
	const [calendarOpen, setCalendarOpen] = useState(false);

	const handleDateSelect = (date: Date) => {
		onDateSelect?.(date);
		setCalendarOpen(false);
	};

	// Calculate Stats
	const maintenanceCount = bookings.filter(
		(b) => b.type === "maintenance"
	).length;
	const totalAttendees = bookings.reduce(
		(acc, curr) => acc + (curr.attendees || 0),
		0
	);

	// Utilization approximation
	const totalMinutes = bookings.reduce(
		(acc, curr) => acc + differenceInMinutes(curr.end, curr.start),
		0
	);
	const utilization = Math.round((totalMinutes / (12 * 60)) * 100);

	return (
		<div className="p-4 border-b flex flex-col space-y-4">
			{/* Top Row: Nav and Actions */}
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						size="icon"
						onClick={onPreviousDay}
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					{/* Date with Calendar Dropdown */}
					<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="ghost"
								className="text-xl font-bold w-auto px-3 text-foreground hover:bg-muted/50"
							>
								<CalendarDays className="mr-2 h-5 w-5 text-primary" />
								{format(currentDate, "MMMM d, yyyy")}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0" align="start">
							<Calendar
								onChange={(value) =>
									handleDateSelect(value as Date)
								}
								value={currentDate}
								locale="en-US"
								prev2Label={null}
								next2Label={null}
								formatShortWeekday={(_locale, date) =>
									["S", "M", "T", "W", "T", "F", "S"][
										date.getDay()
									]
								}
								calendarType="gregory"
								view="month"
							/>
						</PopoverContent>
					</Popover>

					<Button variant="outline" size="icon" onClick={onNextDay}>
						<ChevronRight className="h-4 w-4" />
					</Button>
					<Button variant="ghost" size="sm" onClick={onToday}>
						Today
					</Button>
				</div>

				<div className="flex items-center space-x-4">
					{/* Compact Stats Bar */}
					<div className="hidden lg:flex items-center space-x-4 text-sm text-muted-foreground bg-muted/30 px-3 py-1.5 rounded-full border">
						<div
							className="flex items-center gap-1.5"
							title="Total Bookings"
						>
							<BookOpen className="h-3.5 w-3.5 text-blue-500" />
							<span className="font-medium text-foreground">
								{bookings.length}
							</span>
						</div>
						<Separator orientation="vertical" className="h-4" />
						<div
							className="flex items-center gap-1.5"
							title="Attendees"
						>
							<Users className="h-3.5 w-3.5 text-purple-500" />
							<span className="font-medium text-foreground">
								{totalAttendees}
							</span>
						</div>
						<Separator orientation="vertical" className="h-4" />
						<div
							className="flex items-center gap-1.5"
							title="Utilization"
						>
							<Clock className="h-3.5 w-3.5 text-green-500" />
							<span className="font-medium text-foreground">
								{utilization}%
							</span>
						</div>
						<Separator orientation="vertical" className="h-4" />
						<div
							className="flex items-center gap-1.5"
							title="Maintenance"
						>
							<Tool className="h-3.5 w-3.5 text-amber-500" />
							<span className="font-medium text-foreground">
								{maintenanceCount}
							</span>
						</div>
					</div>

					<Button onClick={onNewBooking}>
						<Plus className="mr-2 h-4 w-4" /> New Booking
					</Button>
				</div>
			</div>
		</div>
	);
};
