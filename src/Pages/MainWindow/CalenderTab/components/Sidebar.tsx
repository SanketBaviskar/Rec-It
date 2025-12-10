import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Facility } from "../types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import "./SidebarCalendar.css"; // Custom overrides

interface SidebarProps {
	facilities: Facility[];
	selectedFacility: string | undefined;
	onSelectFacility: (id: string) => void;
	onFilterChange: (type: string) => void;
	currentDate: Date;
	onDateSelect: (date: Date | undefined) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	facilities,
	selectedFacility,
	onSelectFacility,
	onFilterChange,
	currentDate,
	onDateSelect,
}) => {
	return (
		<div className="w-auto border-r p-4 hidden md:block bg-slate-50/50 flex flex-col h-full">
			<div className="space-y-4 flex-1 flex flex-col overflow-hidden">
				{/* Mini Calendar */}
				<div className="flex justify-center py-2">
					<Calendar
						onChange={(value) => onDateSelect(value as Date)}
						value={currentDate}
						locale="en-US"
						prev2Label={null} // Hide year jump
						next2Label={null} // Hide year jump
						formatShortWeekday={(locale, date) =>
							["S", "M", "T", "W", "T", "F", "S"][date.getDay()]
						} // Single letter
						calendarType="gregory" // Sunday start
						view="month"
					/>
				</div>

				<div className="relative shrink-0">
					<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search facilities..."
						className="pl-8"
					/>
				</div>
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4" />
					<Select defaultValue="all" onValueChange={onFilterChange}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="All Types" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Types</SelectItem>
							<SelectItem value="Court">Court</SelectItem>
							<SelectItem value="Pool">Pool</SelectItem>
							<SelectItem value="Studio">Studio</SelectItem>
							<SelectItem value="Gym">Gym</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<ScrollArea className="flex-1">
					<div className="space-y-4">
						{facilities.map((facility) => (
							<Card
								key={facility.id}
								className={`cursor-pointer hover:bg-accent/50 transition-colors ${
									selectedFacility === facility.id
										? "bg-accent border-primary"
										: ""
								}`}
								onClick={() => onSelectFacility(facility.id)}
							>
								<CardContent className="p-4">
									<div className="flex justify-between items-start">
										<div>
											<h3 className="font-medium">
												{facility.name}
											</h3>
											<p className="text-sm text-muted-foreground">
												{facility.type} •{" "}
												{facility.capacity} capacity
											</p>
											<p className="text-sm text-muted-foreground">
												{facility.location}
											</p>
										</div>
										<Badge variant={"default"}>Aval</Badge>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};
