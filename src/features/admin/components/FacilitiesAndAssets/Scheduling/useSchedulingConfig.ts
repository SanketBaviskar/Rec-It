import { useState, useEffect } from "react";

export interface SchedulingConfig {
	// Booking Window
	advanceBookingDays: number;
	minBookingHours: number;
	maxBookingHours: number;
	sameDayBookingAllowed: boolean;
	sameDayBookingCutoffHours: number;

	// Cancellation Policy
	freeCancellationHours: number;
	lateCancelFee: number;
	noShowFee: number;

	// Recurring Bookings
	recurringAllowed: boolean;
	maxRecurringWeeks: number;
	requireApprovalForRecurring: boolean;

	// Approval Workflow
	requireApprovalAboveHours: number;
	autoApproveMembers: boolean;
	autoApproveStaff: boolean;

	// Conflict Resolution
	allowOverlap: boolean;
	bufferMinutes: number;
	prioritySystem: string;

	// Pricing
	memberRate: number;
	nonMemberRate: number;
	peakHourMultiplier: number;
	peakHoursStart: string;
	peakHoursEnd: string;
}

const DEFAULT_CONFIG: SchedulingConfig = {
	advanceBookingDays: 14,
	minBookingHours: 1,
	maxBookingHours: 4,
	sameDayBookingAllowed: true,
	sameDayBookingCutoffHours: 2,
	freeCancellationHours: 24,
	lateCancelFee: 25.0,
	noShowFee: 50.0,
	recurringAllowed: true,
	maxRecurringWeeks: 16,
	requireApprovalForRecurring: true,
	requireApprovalAboveHours: 2,
	autoApproveMembers: true,
	autoApproveStaff: true,
	allowOverlap: false,
	bufferMinutes: 15,
	prioritySystem: "firstComeFirstServed",
	memberRate: 0,
	nonMemberRate: 25.0,
	peakHourMultiplier: 1.5,
	peakHoursStart: "17:00",
	peakHoursEnd: "21:00",
};

const STORAGE_KEY = "rec-it-scheduling-config";

export function useSchedulingConfig() {
	const [config, setConfig] = useState<SchedulingConfig>(DEFAULT_CONFIG);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setConfig({ ...DEFAULT_CONFIG, ...parsed });
			} catch (e) {
				console.error("Failed to parse Scheduling config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveConfig = (newConfig: SchedulingConfig) => {
		setConfig(newConfig);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
	};

	const updateConfig = (updates: Partial<SchedulingConfig>) => {
		saveConfig({ ...config, ...updates });
	};

	const resetConfig = () => {
		saveConfig(DEFAULT_CONFIG);
	};

	return {
		config,
		updateConfig,
		resetConfig,
		isLoaded,
	};
}
