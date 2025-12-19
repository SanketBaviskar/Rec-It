import { useState } from "react";
import {
	addDays,
	subDays,
	addWeeks,
	subWeeks,
	addMonths,
	subMonths,
} from "date-fns";

export const useCalendarNavigation = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState<"day" | "week" | "month">("day");

	// Day navigation
	const handlePreviousDay = () => {
		setCurrentDate((prev) => subDays(prev, 1));
	};

	const handleNextDay = () => {
		setCurrentDate((prev) => addDays(prev, 1));
	};

	// Week navigation
	const handlePreviousWeek = () => {
		setCurrentDate((prev) => subWeeks(prev, 1));
	};

	const handleNextWeek = () => {
		setCurrentDate((prev) => addWeeks(prev, 1));
	};

	// Month navigation
	const handlePreviousMonth = () => {
		setCurrentDate((prev) => subMonths(prev, 1));
	};

	const handleNextMonth = () => {
		setCurrentDate((prev) => addMonths(prev, 1));
	};

	// Smart navigation based on current view
	const handlePrevious = () => {
		switch (view) {
			case "day":
				handlePreviousDay();
				break;
			case "week":
				handlePreviousWeek();
				break;
			case "month":
				handlePreviousMonth();
				break;
		}
	};

	const handleNext = () => {
		switch (view) {
			case "day":
				handleNextDay();
				break;
			case "week":
				handleNextWeek();
				break;
			case "month":
				handleNextMonth();
				break;
		}
	};

	const handleToday = () => {
		setCurrentDate(new Date());
	};

	return {
		currentDate,
		view,
		setView,
		handlePrevious,
		handleNext,
		handlePreviousDay,
		handleNextDay,
		handlePreviousWeek,
		handleNextWeek,
		handlePreviousMonth,
		handleNextMonth,
		handleToday,
		setDate: setCurrentDate,
	};
};
