import { useState, useEffect } from "react";

export interface ClassType {
	id: number;
	name: string;
	duration: number;
	capacity: number;
	active: boolean;
}

export interface GroupFitnessConfig {
	// Registration Settings
	allowOnlineRegistration: boolean;
	registrationOpensHours: number;
	registrationClosesMinutes: number;
	allowWaitlist: boolean;
	maxWaitlistSize: number;

	// Cancellation Policy
	lateCancelMinutes: number;
	lateCancelFee: number;
	noShowFee: number;
	maxNoShowsPerMonth: number;

	// Class Settings
	defaultClassDuration: number;
	timeBetweenClasses: number;
	requireCheckIn: boolean;
	checkInWindowMinutes: number;
	releaseSpotIfNotCheckedIn: boolean;

	// Instructor Settings
	requireCertification: boolean;
	allowSubstitutes: boolean;
	notifyOnSubstitute: boolean;

	// Capacity
	memberOnlyClasses: boolean;
	allowGuestAccess: boolean;
	guestFeePerClass: number;
}

const DEFAULT_CLASS_TYPES: ClassType[] = [
	{ id: 1, name: "Yoga", duration: 60, capacity: 25, active: true },
	{ id: 2, name: "Spinning", duration: 45, capacity: 20, active: true },
	{ id: 3, name: "HIIT", duration: 30, capacity: 30, active: true },
	{ id: 4, name: "Pilates", duration: 60, capacity: 20, active: true },
	{ id: 5, name: "Zumba", duration: 60, capacity: 40, active: true },
	{ id: 6, name: "Body Pump", duration: 45, capacity: 25, active: false },
];

const DEFAULT_CONFIG: GroupFitnessConfig = {
	allowOnlineRegistration: true,
	registrationOpensHours: 48,
	registrationClosesMinutes: 30,
	allowWaitlist: true,
	maxWaitlistSize: 10,
	lateCancelMinutes: 120,
	lateCancelFee: 5.0,
	noShowFee: 10.0,
	maxNoShowsPerMonth: 3,
	defaultClassDuration: 60,
	timeBetweenClasses: 15,
	requireCheckIn: true,
	checkInWindowMinutes: 15,
	releaseSpotIfNotCheckedIn: true,
	requireCertification: true,
	allowSubstitutes: true,
	notifyOnSubstitute: true,
	memberOnlyClasses: false,
	allowGuestAccess: true,
	guestFeePerClass: 5.0,
};

const STORAGE_KEY = "rec-it-group-fitness-config";

export function useGroupFitnessConfig() {
	const [classTypes, setClassTypes] =
		useState<ClassType[]>(DEFAULT_CLASS_TYPES);
	const [config, setConfig] = useState<GroupFitnessConfig>(DEFAULT_CONFIG);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setClassTypes(parsed.classTypes || DEFAULT_CLASS_TYPES);
				setConfig(parsed.config || DEFAULT_CONFIG);
			} catch (e) {
				console.error("Failed to parse Group Fitness config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveConfig = (
		newClassTypes: ClassType[],
		newConfig: GroupFitnessConfig
	) => {
		setClassTypes(newClassTypes);
		setConfig(newConfig);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				classTypes: newClassTypes,
				config: newConfig,
			})
		);
	};

	const updateConfig = (updates: Partial<GroupFitnessConfig>) => {
		saveConfig(classTypes, { ...config, ...updates });
	};

	const addClassType = (classType: Omit<ClassType, "id">) => {
		const newId = Math.max(0, ...classTypes.map((c) => c.id)) + 1;
		saveConfig([...classTypes, { ...classType, id: newId }], config);
	};

	const updateClassType = (id: number, updates: Partial<ClassType>) => {
		saveConfig(
			classTypes.map((c) => (c.id === id ? { ...c, ...updates } : c)),
			config
		);
	};

	const removeClassType = (id: number) => {
		saveConfig(
			classTypes.filter((c) => c.id !== id),
			config
		);
	};

	const resetConfig = () => {
		saveConfig(DEFAULT_CLASS_TYPES, DEFAULT_CONFIG);
	};

	return {
		classTypes,
		config,
		updateConfig,
		addClassType,
		updateClassType,
		removeClassType,
		resetConfig,
		isLoaded,
	};
}
