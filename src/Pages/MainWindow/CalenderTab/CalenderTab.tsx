"use client";

import { useState } from "react";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingForm } from "./BookingForm";
import { Booking } from "./types";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { DayView } from "./components/DayView";
import { WeekView } from "./components/WeekView";
import { MonthView } from "./components/MonthView";
import { useFacilities } from "./hooks/useFacilities";
import { useCalendarNavigation } from "./hooks/useCalendarNavigation";
import { useReservations } from "./hooks/useReservations";
import { useConflictDetection } from "./hooks/useConflictDetection";

export default function CalendarTab() {
	// Custom Hooks
	const {
		facilities,
		categories,
		selectedFacility,
		toggleFacilitySelection,
		loadFacilities,
	} = useFacilities();

	const {
		currentDate,
		view,
		setView,
		handlePrevious,
		handleNext,
		handleToday,
		setDate,
	} = useCalendarNavigation();

	const {
		filteredBookings,
		loadReservations,
		handleUpdateBooking,
		handleDeleteBooking,
	} = useReservations(currentDate, selectedFacility);

	// Conflict Detection
	const { isBookingConflicting, checkNewBookingConflict } =
		useConflictDetection(filteredBookings);

	// Local UI State
	const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
	const [selectedBookingDate, setSelectedBookingDate] = useState(new Date());
	const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
	const [newBookingRange, setNewBookingRange] = useState<{
		start: Date;
		end: Date;
	} | null>(null);

	const onFilterChange = (type: string) => {
		loadFacilities(type);
	};

	// Handlers for slot/event interactions
	const handleSlotClick = (date: Date) => {
		setSelectedBookingDate(date);
		setEditingBooking(null);
		setIsBookingModalOpen(true);
	};

	const handleSlotRangeSelect = (start: Date, end: Date) => {
		setSelectedBookingDate(start);
		setNewBookingRange({ start, end });
		setEditingBooking(null);
		setIsBookingModalOpen(true);
	};

	const handleEventClick = (booking: Booking) => {
		setEditingBooking(booking);
		setIsBookingModalOpen(true);
	};

	const handleDayClick = (date: Date) => {
		setDate(date);
		setView("day");
	};

	return (
		<div className="flex h-[calc(100vh-4rem)] bg-background">
			<Sidebar
				facilities={facilities}
				categories={categories}
				selectedFacility={selectedFacility}
				onSelectFacility={toggleFacilitySelection}
				onFilterChange={onFilterChange}
			/>

			<div className="flex-1 flex flex-col overflow-hidden min-h-0">
				<Header
					currentDate={currentDate}
					bookings={filteredBookings}
					onPreviousDay={handlePrevious}
					onNextDay={handleNext}
					onToday={handleToday}
					onDateSelect={(d) => d && setDate(d)}
					onNewBooking={() => {
						setEditingBooking(null);
						setIsBookingModalOpen(true);
					}}
				/>

				{/* View Tabs */}
				<div className="px-4 py-2 border-b">
					<Tabs
						value={view}
						onValueChange={(v) =>
							setView(v as "day" | "week" | "month")
						}
					>
						<TabsList>
							<TabsTrigger value="day">Day</TabsTrigger>
							<TabsTrigger value="week">Week</TabsTrigger>
							<TabsTrigger value="month">Month</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="flex-1 min-h-0 overflow-auto bg-background relative">
					{view === "day" && (
						<DayView
							currentDate={currentDate}
							bookings={filteredBookings}
							facilities={facilities}
							onMoveBooking={handleUpdateBooking}
							onResizeBooking={handleUpdateBooking}
							onDeleteBooking={handleDeleteBooking}
							onSlotClick={handleSlotClick}
							onSlotRangeSelect={handleSlotRangeSelect}
							onEventClick={handleEventClick}
							isBookingConflicting={isBookingConflicting}
						/>
					)}

					{view === "week" && (
						<WeekView
							currentDate={currentDate}
							bookings={filteredBookings}
							facilities={facilities}
							onSlotRangeSelect={handleSlotRangeSelect}
							onEventClick={handleEventClick}
							onDeleteBooking={handleDeleteBooking}
							isBookingConflicting={isBookingConflicting}
						/>
					)}

					{view === "month" && (
						<MonthView
							currentDate={currentDate}
							bookings={filteredBookings}
							facilities={facilities}
							onDayClick={handleDayClick}
							onEventClick={handleEventClick}
						/>
					)}
				</div>
			</div>

			<Dialog
				open={isBookingModalOpen}
				onOpenChange={setIsBookingModalOpen}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>
							{editingBooking ? "Edit Booking" : "New Booking"}
						</DialogTitle>
					</DialogHeader>
					<BookingForm
						selectedDate={selectedBookingDate}
						initialRange={newBookingRange}
						facilities={facilities}
						categories={categories}
						selectedFacility={selectedFacility}
						onBook={loadReservations}
						onClose={() => {
							setIsBookingModalOpen(false);
							setEditingBooking(null);
							setNewBookingRange(null);
						}}
						editingBooking={editingBooking}
						checkNewBookingConflict={checkNewBookingConflict}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
