import { useState, useEffect } from "react";

export interface POSCategory {
	id: string;
	label: string;
	iconName: string;
}

export interface POSItem {
	id: string;
	name: string;
	price: number;
	category: string;
	requiresCollateral: boolean;
	isMembership: boolean;
	type: "goods" | "service" | "access" | "rental";
	iconName?: string;
}

export interface POSGeneralConfig {
	// Tax Settings
	taxEnabled: boolean;
	taxRate: number;
	taxOnMemberships: boolean;
	taxOnFood: boolean;
	taxOnMerchandise: boolean;
	taxOnServices: boolean;

	// Payment Methods
	acceptCash: boolean;
	acceptCard: boolean;
	acceptStudentAccount: boolean;
	acceptPayrollDeduction: boolean;

	// Receipt Settings
	printReceiptByDefault: boolean;
	emailReceiptEnabled: boolean;
	receiptHeader: string;
	receiptFooter: string;

	// Refund Policy
	allowRefunds: boolean;
	refundWindowDays: number;
	requireManagerApproval: boolean;
	approvalThreshold: number;

	// Proration
	prorationEnabled: boolean;
	prorationMethod: "daily" | "weekly" | "halfMonth" | "none";
}

// Built-in categories — always shown, not stored in localStorage
export const BUILTIN_CATEGORIES: POSCategory[] = [
	{ id: "memberships", label: "Memberships", iconName: "CreditCard" },
	{ id: "passes", label: "Passes", iconName: "Ticket" },
];

// User-defined custom categories stored in localStorage (excludes built-ins)
const DEFAULT_CATEGORIES: POSCategory[] = [
	{ id: "rentals", label: "Rentals", iconName: "Package" },
	{ id: "services", label: "Services", iconName: "Sparkles" },
	{ id: "gear", label: "Gear Shop", iconName: "Shirt" },
];

const DEFAULT_ITEMS: POSItem[] = [
	{
		id: "day-pass",
		name: "Day Pass",
		price: 10,
		category: "passes",
		requiresCollateral: false,
		isMembership: false,
		type: "access",
		iconName: "Ticket",
	},
	{
		id: "locker-rental",
		name: "Locker Rental",
		price: 15,
		category: "rentals",
		requiresCollateral: true,
		isMembership: false,
		type: "rental",
		iconName: "Package",
	},
	{
		id: "basketball",
		name: "Basketball",
		price: 0,
		category: "rentals",
		requiresCollateral: true,
		isMembership: false,
		type: "rental",
		iconName: "Dumbbell",
	},
	{
		id: "semester-pass",
		name: "Semester Membership",
		price: 150,
		category: "memberships",
		requiresCollateral: false,
		isMembership: true,
		type: "access",
		iconName: "CreditCard",
	},
];

export const DEFAULT_GENERAL_CONFIG: POSGeneralConfig = {
	taxEnabled: true,
	taxRate: 8.25,
	taxOnMemberships: false,
	taxOnFood: true,
	taxOnMerchandise: true,
	taxOnServices: false,
	acceptCash: true,
	acceptCard: true,
	acceptStudentAccount: true,
	acceptPayrollDeduction: false,
	printReceiptByDefault: true,
	emailReceiptEnabled: true,
	receiptHeader: "University Recreation Center",
	receiptFooter: "Thank you for your visit!",
	allowRefunds: true,
	refundWindowDays: 30,
	requireManagerApproval: true,
	approvalThreshold: 50.0,
	prorationEnabled: true,
	prorationMethod: "daily",
};

const STORAGE_KEY = "rec-it-pos-config";

export function usePOSConfig() {
	const [categories, setCategories] =
		useState<POSCategory[]>(DEFAULT_CATEGORIES);
	const [items, setItems] = useState<POSItem[]>(DEFAULT_ITEMS);
	const [generalConfig, setGeneralConfig] = useState<POSGeneralConfig>(
		DEFAULT_GENERAL_CONFIG,
	);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setCategories(parsed.categories || DEFAULT_CATEGORIES);
				// Ensure items include type if loaded from old config (migration)
				const loadedItems = (parsed.items || DEFAULT_ITEMS).map(
					(item: any) => ({
						...item,
						type: item.type || "goods", // Default to goods if missing
					}),
				);
				setItems(loadedItems);
				setGeneralConfig(
					parsed.generalConfig || DEFAULT_GENERAL_CONFIG,
				);
			} catch (e) {
				console.error("Failed to parse POS config", e);
			}
		}
	}, []);

	const saveConfig = (
		newCategories: POSCategory[],
		newItems: POSItem[],
		newGeneralConfig: POSGeneralConfig,
	) => {
		setCategories(newCategories);
		setItems(newItems);
		setGeneralConfig(newGeneralConfig);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				categories: newCategories,
				items: newItems,
				generalConfig: newGeneralConfig,
			}),
		);
	};

	const addItem = (item: POSItem) => {
		saveConfig(categories, [...items, item], generalConfig);
	};

	const removeItem = (id: string) => {
		saveConfig(
			categories,
			items.filter((i) => i.id !== id),
			generalConfig,
		);
	};

	const addCategory = (category: POSCategory) => {
		saveConfig([...categories, category], items, generalConfig);
	};

	const removeCategory = (id: string) => {
		saveConfig(
			categories.filter((c) => c.id !== id),
			items.filter((i) => i.category !== id), // Also remove items in that category? Or keep them orphaned? Ideally remove or reassign. Removing safe for now.
			generalConfig,
		);
	};

	const updateItem = (updatedItem: POSItem) => {
		saveConfig(
			categories,
			items.map((i) => (i.id === updatedItem.id ? updatedItem : i)),
			generalConfig,
		);
	};

	const updateCategory = (updatedCategory: POSCategory) => {
		saveConfig(
			categories.map((c) =>
				c.id === updatedCategory.id ? updatedCategory : c,
			),
			items,
			generalConfig,
		);
	};

	const updateGeneralConfig = (updates: Partial<POSGeneralConfig>) => {
		const newConfig = { ...generalConfig, ...updates };
		saveConfig(categories, items, newConfig);
	};

	/**
	 * Resets all configuration to factory defaults
	 */
	const resetConfig = () => {
		saveConfig(DEFAULT_CATEGORIES, DEFAULT_ITEMS, DEFAULT_GENERAL_CONFIG);
	};

	return {
		categories,
		items,
		config: generalConfig,
		addItem,
		removeItem,
		addCategory,
		removeCategory,
		updateItem,
		updateCategory,
		updateGeneralConfig,
		resetConfig,
	};
}
