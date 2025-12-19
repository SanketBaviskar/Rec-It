import React, { useState } from "react";
import { Search, Filter, CalendarDays, MapPin, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
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
import { format } from "date-fns";

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
	const [calendarOpen, setCalendarOpen] = useState(false);

	const handleDateSelect = (date: Date) => {
		onDateSelect(date);
		setCalendarOpen(false);
	};

	// Flatten all items for easy lookup
	const selectedItem = facilities
		.flatMap((f) => f.items || [])
		.find((i) => i.id === selectedFacility);

	return (
		<div className="w-64 border-r p-4 hidden md:block bg-slate-50/50 dark:bg-slate-900/50 flex flex-col h-full">
			<div className="flex-1 flex flex-col overflow-hidden gap-4">
				{/* Dropdown Calendar */}
				<Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className="w-full justify-start text-left font-normal"
						>
							<CalendarDays className="mr-2 h-4 w-4" />
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
				<div className="flex-1 min-h-0 overflow-y-auto">
					<div className="space-y-4 pr-2">
						{facilities.map((facility) => (
							<div key={facility.id} className="space-y-1">
								<h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
									{facility.name}
								</h4>
								{facility.items?.map((item) => (
									<div
										key={item.id}
										className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
											selectedFacility === item.id
												? "bg-primary text-primary-foreground"
												: "hover:bg-muted"
										}`}
										onClick={() =>
											onSelectFacility(item.id)
										}
									>
										<div className="flex items-center gap-2">
											<div
												className="w-2 h-2 rounded-full shrink-0"
												style={{
													backgroundColor:
														item.color || "#3b82f6",
												}}
											/>
											<span className="text-sm font-medium truncate">
												{item.name}
											</span>
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>

				{/* Selected Facility Detail Panel */}
				{selectedItem && (
					<Card className="bg-primary/5 border-primary/20 shrink-0 mt-2">
						<CardContent className="p-3">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-semibold text-sm">
									{selectedItem.name}
								</h3>
								<Badge
									variant="secondary"
									style={{
										backgroundColor:
											selectedItem.color || "#3b82f6",
										color: "white",
									}}
								>
									{selectedItem.status}
								</Badge>
							</div>
							<div className="space-y-1 text-xs text-muted-foreground">
								<div className="flex items-center gap-1.5">
									<Users className="h-3 w-3" />
									<span>
										Capacity:{" "}
										{facilities.find(
											(f) =>
												f.id === selectedItem.facilityId
										)?.capacity || "N/A"}
									</span>
								</div>
								{facilities.find(
									(f) => f.id === selectedItem.facilityId
								)?.location && (
									<div className="flex items-center gap-1.5">
										<MapPin className="h-3 w-3" />
										<span>
											{
												facilities.find(
													(f) =>
														f.id ===
														selectedItem.facilityId
												)?.location
											}
										</span>
									</div>
								)}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
};
