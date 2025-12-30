import { useState, useEffect } from "react";

export interface LockerBank {
	id: number;
	name: string;
	location: string;
	total: number;
	available: number;
	active: boolean;
}

export interface LockerConfig {
	// Rental Periods
	dailyRentalEnabled: boolean;
	dailyRate: number;
	semesterRentalEnabled: boolean;
	semesterRate: number;
	annualRentalEnabled: boolean;
	annualRate: number;

	// Assignment Rules
	autoAssign: boolean;
	allowPreference: boolean;
	requireDeposit: boolean;
	depositAmount: number;

	// Cleanout Policy
	cleanoutAfterDays: number;
	sendCleanoutWarning: boolean;
	warningDaysBefore: number;
	chargeCleanoutFee: boolean;
	cleanoutFee: number;

	// Access
	requireMembership: boolean;
	allowGuestLockers: boolean;
}

const DEFAULT_CONFIG: LockerConfig = {
	dailyRentalEnabled: true,
	dailyRate: 2.0,
	semesterRentalEnabled: true,
	semesterRate: 50.0,
	annualRentalEnabled: true,
	annualRate: 100.0,
	autoAssign: true,
	allowPreference: true,
	requireDeposit: true,
	depositAmount: 25.0,
	cleanoutAfterDays: 14,
	sendCleanoutWarning: true,
	warningDaysBefore: 7,
	chargeCleanoutFee: true,
	cleanoutFee: 25.0,
	requireMembership: true,
	allowGuestLockers: false,
};

const DEFAULT_LOCKER_BANKS: LockerBank[] = [
	{
		id: 1,
		name: "Men's Main",
		location: "Locker Room A",
		total: 100,
		available: 23,
		active: true,
	},
	{
		id: 2,
		name: "Women's Main",
		location: "Locker Room B",
		total: 100,
		available: 31,
		active: true,
	},
	{
		id: 3,
		name: "Day Use - Pool",
		location: "Pool Deck",
		total: 50,
		available: 50,
		active: true,
	},
	{
		id: 4,
		name: "VIP Lockers",
		location: "Premium Area",
		total: 20,
		available: 5,
		active: true,
	},
];

const STORAGE_KEY = "rec-it-locker-config";

export function useLockerConfig() {
	const [config, setConfig] = useState<LockerConfig>(DEFAULT_CONFIG);
	const [lockerBanks, setLockerBanks] =
		useState<LockerBank[]>(DEFAULT_LOCKER_BANKS);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setConfig(parsed.config || DEFAULT_CONFIG);
				setLockerBanks(parsed.lockerBanks || DEFAULT_LOCKER_BANKS);
			} catch (e) {
				console.error("Failed to parse Locker config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveAll = (newConfig: LockerConfig, newBanks?: LockerBank[]) => {
		setConfig(newConfig);
		const banksToSave = newBanks ?? lockerBanks;
		if (newBanks) setLockerBanks(newBanks);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				config: newConfig,
				lockerBanks: banksToSave,
			})
		);
	};

	const updateConfig = (updates: Partial<LockerConfig>) => {
		saveAll({ ...config, ...updates });
	};

	const resetConfig = () => {
		saveAll(DEFAULT_CONFIG, DEFAULT_LOCKER_BANKS);
	};

	// Locker Bank CRUD
	const addLockerBank = (bank: Omit<LockerBank, "id">) => {
		const newId = Math.max(0, ...lockerBanks.map((b) => b.id)) + 1;
		const newBank: LockerBank = { ...bank, id: newId };
		saveAll(config, [...lockerBanks, newBank]);
	};

	const updateLockerBank = (id: number, updates: Partial<LockerBank>) => {
		saveAll(
			config,
			lockerBanks.map((b) => (b.id === id ? { ...b, ...updates } : b))
		);
	};

	const removeLockerBank = (id: number) => {
		saveAll(
			config,
			lockerBanks.filter((b) => b.id !== id)
		);
	};

	return {
		config,
		lockerBanks,
		updateConfig,
		resetConfig,
		addLockerBank,
		updateLockerBank,
		removeLockerBank,
		isLoaded,
	};
}
