"use client";

import * as React from "react";
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
import { useFacilities } from "./hooks/useFacilities";
import { useCalendarNavigation } from "./hooks/useCalendarNavigation";
import { useReservations } from "./hooks/useReservations";

export default function CalendarTab() {
	// Custom Hooks
	const {
		facilities,
		selectedFacility,
		toggleFacilitySelection,
		loadFacilities,
	} = useFacilities();

	const {
		currentDate,
		view,
		setView,
		handlePreviousDay,
		handleNextDay,
		handleToday,
		setDate, // Add this
	} = useCalendarNavigation();

	const {
		filteredBookings,
		loadReservations,
		handleUpdateBooking,
		handleDeleteBooking,
	} = useReservations(currentDate, selectedFacility);

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

	return (
		<div className="flex h-[90vh] bg-background">
			<Sidebar
				facilities={facilities}
				selectedFacility={selectedFacility}
				onSelectFacility={toggleFacilitySelection}
				onFilterChange={onFilterChange}
				currentDate={currentDate}
				onDateSelect={(d) => d && setDate(d)}
			/>

			<div className="flex-1 flex flex-col overflow-hidden">
				<Header
					currentDate={currentDate}
					bookings={filteredBookings}
					onPreviousDay={handlePreviousDay}
					onNextDay={handleNextDay}
					onToday={handleToday}
					onNewBooking={() => {
						setEditingBooking(null);
						setIsBookingModalOpen(true);
					}}
				/>

				{/* Stats removed (merged into Header) */}

				<div className="px-4 py-2 border-b">
					<Tabs value={view} onValueChange={(v) => setView(v as any)}>
						<TabsList>
							<TabsTrigger value="day">Day</TabsTrigger>
							<TabsTrigger value="week" disabled>
								Week (Coming Soon)
							</TabsTrigger>
							<TabsTrigger value="month" disabled>
								Month (Coming Soon)
							</TabsTrigger>
						</TabsList>
					</Tabs>
				</div>

				<div className="flex-1 overflow-auto bg-background relative">
					{view === "day" && (
						<DayView
							currentDate={currentDate}
							bookings={filteredBookings}
							facilities={facilities}
							onMoveBooking={handleUpdateBooking}
							onResizeBooking={handleUpdateBooking}
							onDeleteBooking={handleDeleteBooking}
							onSlotClick={(date) => {
								// Fallback for click without drag
								setSelectedBookingDate(date);
								setEditingBooking(null);
								setIsBookingModalOpen(true);
							}}
							onSlotRangeSelect={(start, end) => {
								setSelectedBookingDate(start);
								setNewBookingRange({ start, end });
								setEditingBooking(null);
								setIsBookingModalOpen(true);
							}}
							onEventClick={(booking) => {
								setEditingBooking(booking);
								setIsBookingModalOpen(true);
							}}
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
						selectedFacility={selectedFacility}
						onBook={loadReservations}
						onClose={() => {
							setIsBookingModalOpen(false);
							setEditingBooking(null);
							setNewBookingRange(null);
						}}
						editingBooking={editingBooking}
					/>
				</DialogContent>
			</Dialog>
		</div>
	);
}
