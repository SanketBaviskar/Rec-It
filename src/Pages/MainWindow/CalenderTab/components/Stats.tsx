import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, Clock, PenToolIcon as Tool } from "lucide-react";
import { differenceInMinutes } from "date-fns";
import { Booking } from "../types";

interface StatsProps {
	bookings: Booking[];
}

export const Stats: React.FC<StatsProps> = ({ bookings }) => {
	return (
		<div className="grid grid-cols-4 gap-4 p-4 border-b bg-muted/20">
			<Card className="col-span-1 shadow-sm border-t-4 border-blue-500">
				<CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
					<CardTitle className="text-sm font-medium">
						Bookings
					</CardTitle>
					<BookOpen className="h-4 w-4 text-blue-600" />
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<div className="text-2xl font-bold">{bookings.length}</div>
					<p className="text-xs text-muted-foreground">
						{
							bookings.filter((b) => b.status === "confirmed")
								.length
						}{" "}
						confirmed
					</p>
				</CardContent>
			</Card>

			<Card className="col-span-1 shadow-sm border-t-4 border-purple-500">
				<CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
					<CardTitle className="text-sm font-medium">
						Activity
					</CardTitle>
					<Users className="h-4 w-4 text-purple-600" />
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<div className="text-2xl font-bold">
						{bookings.reduce(
							(acc, curr) => acc + (curr.attendees || 0),
							0
						)}
					</div>
					<p className="text-xs text-muted-foreground">
						Expected people
					</p>
				</CardContent>
			</Card>

			<Card className="col-span-1 shadow-sm border-t-4 border-green-500">
				<CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
					<CardTitle className="text-sm font-medium">
						Utilization
					</CardTitle>
					<Clock className="h-4 w-4 text-green-600" />
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<div className="text-2xl font-bold">
						{Math.round(
							(bookings.reduce(
								(acc, curr) =>
									acc +
									differenceInMinutes(curr.end, curr.start),
								0
							) /
								(12 * 60)) *
								100
						)}
						%
					</div>
					<p className="text-xs text-muted-foreground">Of 12h day</p>
				</CardContent>
			</Card>

			<Card className="col-span-1 shadow-sm border-t-4 border-amber-500">
				<CardHeader className="flex flex-row items-center justify-between pb-2 p-4">
					<CardTitle className="text-sm font-medium">
						Maintenance
					</CardTitle>
					<Tool className="h-4 w-4 text-amber-600" />
				</CardHeader>
				<CardContent className="p-4 pt-0">
					<div className="text-2xl font-bold">
						{
							bookings.filter((b) => b.type === "maintenance")
								.length
						}
					</div>
					<p className="text-xs text-muted-foreground">Scheduled</p>
				</CardContent>
			</Card>
		</div>
	);
};
