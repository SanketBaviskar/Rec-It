import { useState } from "react";
import { addDays, subDays, addMonths, subMonths } from "date-fns";

export const useCalendarNavigation = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [view, setView] = useState<"day" | "week" | "month">("day");

	const handlePrevious = () => {
		setCurrentDate((prev) => subMonths(prev, 1));
	};

	const handleNext = () => {
		setCurrentDate((prev) => addMonths(prev, 1));
	};

	const handlePreviousDay = () => {
		setCurrentDate((prev) => subDays(prev, 1));
	};

	const handleNextDay = () => {
		setCurrentDate((prev) => addDays(prev, 1));
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
		handleToday,
		setDate: setCurrentDate,
	};
};
