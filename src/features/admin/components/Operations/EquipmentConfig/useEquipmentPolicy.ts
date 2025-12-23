import { useState, useEffect } from "react";

export interface CategoryOverride {
	id: string;
	categoryName: string;
	checkoutHours: number;
	lateFeePerHour: number;
	maxItems: number;
}

export interface EquipmentPolicyConfig {
	// Checkout Limits
	defaultCheckoutHours: number;
	maxCheckoutHours: number;
	allowExtensions: boolean;
	maxExtensions: number;
	extensionHours: number;

	// Late Fee Policy
	lateFeeEnabled: boolean;
	graceMinutes: number;
	lateFeePerHour: number;
	maxLateFee: number;

	// Hold/Suspension Policy
	autoSuspendEnabled: boolean;
	suspendAfterHours: number;
	requirePaymentBeforeReturn: boolean;

	// Damage Assessment
	damageAssessmentRequired: boolean;
	photoRequired: boolean;
	damageCategories: string;

	// Notifications
	reminderEnabled: boolean;
	reminderMinutesBefore: number;
	overdueNotificationEnabled: boolean;
	overdueNotificationInterval: number; // minutes

	// Eligibility Rules
	requireActiveMembership: boolean;
	blockOnOverdue: boolean;
	maxItemsPerUser: number;

	// Collateral Policy
	requireCollateral: boolean;
	defaultCollateralType: string;

	// Renewal & Reservation Rules
	allowRenewals: boolean;
	maxRenewals: number;
	reservationWindowDays: number;
	bufferMinutesBetweenCheckouts: number;
}

const DEFAULT_CONFIG: EquipmentPolicyConfig = {
	defaultCheckoutHours: 6,
	maxCheckoutHours: 24,
	allowExtensions: true,
	maxExtensions: 2,
	extensionHours: 2,
	lateFeeEnabled: true,
	graceMinutes: 15,
	lateFeePerHour: 2.5,
	maxLateFee: 25.0,
	autoSuspendEnabled: true,
	suspendAfterHours: 48,
	requirePaymentBeforeReturn: false,
	damageAssessmentRequired: true,
	photoRequired: true,
	damageCategories: "minor,moderate,severe,lost",
	reminderEnabled: true,
	reminderMinutesBefore: 30,
	overdueNotificationEnabled: true,
	overdueNotificationInterval: 60,
	requireActiveMembership: true,
	blockOnOverdue: true,
	maxItemsPerUser: 3,
	requireCollateral: false,
	defaultCollateralType: "id_card",
	allowRenewals: true,
	maxRenewals: 2,
	reservationWindowDays: 7,
	bufferMinutesBetweenCheckouts: 15,
};

const DEFAULT_OVERRIDES: CategoryOverride[] = [
	{
		id: "1",
		categoryName: "High Value",
		checkoutHours: 4,
		lateFeePerHour: 5.0,
		maxItems: 1,
	},
	{
		id: "2",
		categoryName: "Standard",
		checkoutHours: 8,
		lateFeePerHour: 2.0,
		maxItems: 5,
	},
];

const STORAGE_KEY = "rec-it-equipment-policy";

export function useEquipmentPolicy() {
	const [config, setConfig] = useState<EquipmentPolicyConfig>(DEFAULT_CONFIG);
	const [overrides, setOverrides] =
		useState<CategoryOverride[]>(DEFAULT_OVERRIDES);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setConfig(parsed.config || DEFAULT_CONFIG);
				setOverrides(parsed.overrides || DEFAULT_OVERRIDES);
			} catch (e) {
				console.error("Failed to parse Equipment Policy config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveConfig = (
		newConfig: EquipmentPolicyConfig,
		newOverrides: CategoryOverride[]
	) => {
		setConfig(newConfig);
		setOverrides(newOverrides);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				config: newConfig,
				overrides: newOverrides,
			})
		);
	};

	const updateConfig = (updates: Partial<EquipmentPolicyConfig>) => {
		saveConfig({ ...config, ...updates }, overrides);
	};

	const addOverride = () => {
		const newId = String(Date.now());
		const newOverride: CategoryOverride = {
			id: newId,
			categoryName: "New Category",
			checkoutHours: 6,
			lateFeePerHour: 2.5,
			maxItems: 3,
		};
		saveConfig(config, [...overrides, newOverride]);
	};

	const removeOverride = (id: string) => {
		saveConfig(
			config,
			overrides.filter((o) => o.id !== id)
		);
	};

	const updateOverride = (
		id: string,
		field: keyof CategoryOverride,
		value: string | number
	) => {
		saveConfig(
			config,
			overrides.map((o) => (o.id === id ? { ...o, [field]: value } : o))
		);
	};

	const resetConfig = () => {
		saveConfig(DEFAULT_CONFIG, DEFAULT_OVERRIDES);
	};

	return {
		config,
		overrides,
		updateConfig,
		addOverride,
		removeOverride,
		updateOverride,
		resetConfig,
		isLoaded,
	};
}
