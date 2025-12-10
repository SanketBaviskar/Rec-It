import React from "react";
import { format, differenceInMinutes } from "date-fns";
import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Users,
	BookOpen,
	Clock,
	PenToolIcon as Tool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Booking } from "../types";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
	currentDate: Date;
	bookings: Booking[];
	onPreviousDay: () => void;
	onNextDay: () => void;
	onToday: () => void;
	onNewBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
	currentDate,
	bookings,
	onPreviousDay,
	onNextDay,
	onToday,
	onNewBooking,
}) => {
	// Calculate Stats
	const confirmedCount = bookings.filter(
		(b) => b.status === "confirmed"
	).length;
	const maintenanceCount = bookings.filter(
		(b) => b.type === "maintenance"
	).length;
	const totalAttendees = bookings.reduce(
		(acc, curr) => acc + (curr.attendees || 0),
		0
	);

	// Utilization approximation (of 12h day for all relevant facilities?)
	// This is tricky without knowing total facilities capacity, but we'll use the same logic as Stats.tsx
	// Stats.tsx logic: sum(duration) / (12*60) * 100. This is simplistic but we'll keep it.
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
					<div className="text-xl font-bold w-48 text-center text-foreground">
						{format(currentDate, "MMMM d, yyyy")}
					</div>
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
