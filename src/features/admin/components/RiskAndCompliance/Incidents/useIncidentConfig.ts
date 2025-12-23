import { useState, useEffect } from "react";

export interface IncidentType {
	id: number;
	name: string;
	severity: "Low" | "Medium" | "High" | "Critical";
	requiresReport: boolean;
	active: boolean;
}

export interface IncidentConfig {
	// Reporting Requirements
	requirePhotoEvidence: boolean;
	requireWitnessInfo: boolean;
	requireBodyMap: boolean;
	requireFollowUp: boolean;
	followUpDays: number;

	// Notifications
	notifyManager: boolean;
	notifyRiskOfficer: boolean;
	notifyOnCritical: boolean;
	criticalNotifyEmail: string;

	// Escalation
	autoEscalateHigh: boolean;
	escalationTimeHours: number;

	// Documentation
	retentionYears: number;
	requireSignature: boolean;
	allowAnonymous: boolean;

	// Workflow
	requireReview: boolean;
	reviewerRole: string;
	requireClosure: boolean;
}

const DEFAULT_INCIDENT_TYPES: IncidentType[] = [
	{
		id: 1,
		name: "Injury - Minor",
		severity: "Low",
		requiresReport: true,
		active: true,
	},
	{
		id: 2,
		name: "Injury - Major",
		severity: "High",
		requiresReport: true,
		active: true,
	},
	{
		id: 3,
		name: "Equipment Damage",
		severity: "Medium",
		requiresReport: true,
		active: true,
	},
	{
		id: 4,
		name: "Behavioral Issue",
		severity: "Medium",
		requiresReport: true,
		active: true,
	},
	{
		id: 5,
		name: "Medical Emergency",
		severity: "Critical",
		requiresReport: true,
		active: true,
	},
	{
		id: 6,
		name: "Property Theft",
		severity: "High",
		requiresReport: true,
		active: true,
	},
	{
		id: 7,
		name: "Near Miss",
		severity: "Low",
		requiresReport: false,
		active: true,
	},
];

const DEFAULT_CONFIG: IncidentConfig = {
	requirePhotoEvidence: true,
	requireWitnessInfo: false,
	requireBodyMap: true,
	requireFollowUp: true,
	followUpDays: 7,
	notifyManager: true,
	notifyRiskOfficer: true,
	notifyOnCritical: true,
	criticalNotifyEmail: "risk@university.edu",
	autoEscalateHigh: true,
	escalationTimeHours: 24,
	retentionYears: 7,
	requireSignature: true,
	allowAnonymous: false,
	requireReview: true,
	reviewerRole: "manager",
	requireClosure: true,
};

const STORAGE_KEY = "rec-it-incident-config";

export function useIncidentConfig() {
	const [config, setConfig] = useState<IncidentConfig>(DEFAULT_CONFIG);
	const [incidentTypes, setIncidentTypes] = useState<IncidentType[]>(
		DEFAULT_INCIDENT_TYPES
	);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setConfig({ ...DEFAULT_CONFIG, ...parsed.config });
				setIncidentTypes(
					parsed.incidentTypes || DEFAULT_INCIDENT_TYPES
				);
			} catch (e) {
				console.error("Failed to parse Incident config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveState = (newConfig: IncidentConfig, newTypes: IncidentType[]) => {
		setConfig(newConfig);
		setIncidentTypes(newTypes);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				config: newConfig,
				incidentTypes: newTypes,
			})
		);
	};

	const updateConfig = (updates: Partial<IncidentConfig>) => {
		saveState({ ...config, ...updates }, incidentTypes);
	};

	const addIncidentType = (type: Omit<IncidentType, "id">) => {
		const newId = Math.max(0, ...incidentTypes.map((t) => t.id)) + 1;
		saveState(config, [...incidentTypes, { ...type, id: newId }]);
	};

	const updateIncidentType = (id: number, updates: Partial<IncidentType>) => {
		saveState(
			config,
			incidentTypes.map((t) => (t.id === id ? { ...t, ...updates } : t))
		);
	};

	const removeIncidentType = (id: number) => {
		saveState(
			config,
			incidentTypes.filter((t) => t.id !== id)
		);
	};

	const resetConfig = () => {
		saveState(DEFAULT_CONFIG, DEFAULT_INCIDENT_TYPES);
	};

	return {
		config,
		incidentTypes,
		updateConfig,
		addIncidentType,
		updateIncidentType,
		removeIncidentType,
		resetConfig,
		isLoaded,
	};
}
