import { useState, useEffect } from "react";

export interface Campaign {
	id: number;
	name: string;
	type: "Email" | "Push" | "SMS";
	status: "Active" | "Draft" | "Paused";
	sent: number;
}

export interface MarketingConfig {
	// Email Settings
	emailEnabled: boolean;
	senderName: string;
	senderEmail: string;
	replyToEmail: string;

	// SMS Settings
	smsEnabled: boolean;
	smsProviderConfigured: boolean;

	// Push Notifications
	pushEnabled: boolean;
	pushForNewClasses: boolean;
	pushForClosures: boolean;
	pushForPromotions: boolean;

	// Automations
	welcomeEmailEnabled: boolean;
	birthdayEmailEnabled: boolean;
	renewalReminderEnabled: boolean;
	renewalReminderDays: number;

	// Frequency Limits
	maxEmailsPerWeek: number;
	unsubscribeEnabled: boolean;
}

const DEFAULT_CAMPAIGNS: Campaign[] = [
	{
		id: 1,
		name: "Welcome Series",
		type: "Email",
		status: "Active",
		sent: 1250,
	},
	{
		id: 2,
		name: "Membership Renewal",
		type: "Email",
		status: "Active",
		sent: 340,
	},
	{
		id: 3,
		name: "Birthday Discount",
		type: "Email",
		status: "Active",
		sent: 89,
	},
	{ id: 4, name: "Re-engagement", type: "Email", status: "Draft", sent: 0 },
	{
		id: 5,
		name: "New Class Alert",
		type: "Push",
		status: "Active",
		sent: 2100,
	},
];

const DEFAULT_CONFIG: MarketingConfig = {
	emailEnabled: true,
	senderName: "Campus Recreation",
	senderEmail: "rec@university.edu",
	replyToEmail: "support@university.edu",
	smsEnabled: false,
	smsProviderConfigured: false,
	pushEnabled: true,
	pushForNewClasses: true,
	pushForClosures: true,
	pushForPromotions: false,
	welcomeEmailEnabled: true,
	birthdayEmailEnabled: true,
	renewalReminderEnabled: true,
	renewalReminderDays: 30,
	maxEmailsPerWeek: 3,
	unsubscribeEnabled: true,
};

const STORAGE_KEY = "rec-it-marketing-config";

export function useMarketingConfig() {
	const [config, setConfig] = useState<MarketingConfig>(DEFAULT_CONFIG);
	const [campaigns, setCampaigns] = useState<Campaign[]>(DEFAULT_CAMPAIGNS);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setConfig({ ...DEFAULT_CONFIG, ...parsed.config });
				setCampaigns(parsed.campaigns || DEFAULT_CAMPAIGNS);
			} catch (e) {
				console.error("Failed to parse Marketing config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveState = (
		newConfig: MarketingConfig,
		newCampaigns: Campaign[]
	) => {
		setConfig(newConfig);
		setCampaigns(newCampaigns);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				config: newConfig,
				campaigns: newCampaigns,
			})
		);
	};

	const updateConfig = (updates: Partial<MarketingConfig>) => {
		saveState({ ...config, ...updates }, campaigns);
	};

	const addCampaign = (campaign: Omit<Campaign, "id">) => {
		const newId = Math.max(0, ...campaigns.map((c) => c.id)) + 1;
		saveState(config, [...campaigns, { ...campaign, id: newId }]);
	};

	const updateCampaign = (id: number, updates: Partial<Campaign>) => {
		saveState(
			config,
			campaigns.map((c) => (c.id === id ? { ...c, ...updates } : c))
		);
	};

	const removeCampaign = (id: number) => {
		saveState(
			config,
			campaigns.filter((c) => c.id !== id)
		);
	};

	const resetConfig = () => {
		saveState(DEFAULT_CONFIG, DEFAULT_CAMPAIGNS);
	};

	return {
		config,
		campaigns,
		updateConfig,
		addCampaign,
		updateCampaign,
		removeCampaign,
		resetConfig,
		isLoaded,
	};
}
