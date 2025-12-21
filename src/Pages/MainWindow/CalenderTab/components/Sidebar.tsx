import React, { useState, useMemo } from "react";
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
import { Facility, FacilityCategory } from "../types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Default styles
import "./SidebarCalendar.css"; // Custom overrides
import { format } from "date-fns";

interface SidebarProps {
	facilities: Facility[];
	categories?: FacilityCategory[];
	selectedFacility: string | undefined;
	onSelectFacility: (id: string) => void;
	onFilterChange: (type: string) => void;
	currentDate: Date;
	onDateSelect: (date: Date | undefined) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
	facilities,
	categories = [],
	selectedFacility,
	onSelectFacility,
	onFilterChange,
	currentDate,
	onDateSelect,
}) => {
	const [calendarOpen, setCalendarOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const handleDateSelect = (date: Date) => {
		onDateSelect(date);
		setCalendarOpen(false);
	};

	// Find selected facility object
	const selectedItem = facilities.find((f) => f.id === selectedFacility);

	// Group facilities by category
	const groupedFacilities = useMemo(() => {
		const filtered = facilities.filter((f) =>
			f.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		const groups: Record<string, Facility[]> = {};

		// Initialize groups for all categories
		categories.forEach((cat) => {
			groups[cat.id] = [];
		});
		groups["uncategorized"] = [];

		filtered.forEach((f) => {
			const catId = f.categoryId || "uncategorized";
			if (!groups[catId]) groups[catId] = [];
			groups[catId].push(f);
		});

		return groups;
	}, [facilities, categories, searchTerm]);

	// Get category name helper
	const getCategoryName = (catId: string) => {
		if (catId === "uncategorized") return "Uncategorized";
		const cat = categories.find((c) => c.id === catId);
		return cat?.name || "Other";
	};

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
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="flex items-center gap-2">
					<Filter className="h-4 w-4" />
					<Select defaultValue="all" onValueChange={onFilterChange}>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="All Categories" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Categories</SelectItem>
							{categories.map((cat) => (
								<SelectItem key={cat.id} value={cat.id}>
									{cat.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex-1 min-h-0 overflow-y-auto">
					<div className="space-y-4 pr-2">
						{Object.entries(groupedFacilities).map(
							([catId, items]) => {
								if (items.length === 0) return null;

								return (
									<div key={catId} className="space-y-1">
										<h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 sticky top-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm py-1 z-10">
											{getCategoryName(catId)}
										</h4>
										{items.map((facility) => (
											<div
												key={facility.id}
												className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-colors ${
													selectedFacility ===
													facility.id
														? "bg-primary text-primary-foreground shadow-sm"
														: "hover:bg-muted"
												}`}
												onClick={() =>
													onSelectFacility(
														facility.id
													)
												}
											>
												<div className="flex items-center gap-2 overflow-hidden">
													<div
														className="w-2.5 h-2.5 rounded-full shrink-0 ring-2 ring-white/20"
														style={{
															backgroundColor:
																facility.color ||
																"#3b82f6",
														}}
													/>
													<span className="text-sm font-medium truncate">
														{facility.name}
													</span>
												</div>
											</div>
										))}
									</div>
								);
							}
						)}
						{Object.values(groupedFacilities).every(
							(g) => g.length === 0
						) && (
							<div className="text-center text-muted-foreground text-sm py-8">
								No facilities found
							</div>
						)}
					</div>
				</div>

				{/* Selected Facility Detail Panel */}
				{selectedItem && (
					<Card className="bg-primary/5 border-primary/20 shrink-0 mt-2">
						<CardContent className="p-3">
							<div className="flex items-center justify-between mb-2">
								<h3 className="font-semibold text-sm truncate pr-2">
									{selectedItem.name}
								</h3>
								<Badge
									variant={
										selectedItem.status === "available"
											? "default"
											: "secondary"
									}
									className="shrink-0"
									style={{
										backgroundColor:
											selectedItem.status === "available"
												? selectedItem.color ||
												  "#3b82f6"
												: undefined,
									}}
								>
									{selectedItem.status}
								</Badge>
							</div>
							<div className="space-y-1.5 text-xs text-muted-foreground">
								{selectedItem.capacity && (
									<div className="flex items-center gap-1.5">
										<Users className="h-3 w-3" />
										<span>
											Capacity: {selectedItem.capacity}
										</span>
									</div>
								)}
								{selectedItem.location && (
									<div className="flex items-center gap-1.5">
										<MapPin className="h-3 w-3" />
										<span>{selectedItem.location}</span>
									</div>
								)}
								{selectedItem.description && (
									<p className="mt-1 line-clamp-2 italic">
										{selectedItem.description}
									</p>
								)}
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
};
