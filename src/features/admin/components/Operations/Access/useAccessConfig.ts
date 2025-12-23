import { useState, useEffect } from "react";

export interface AccessConfig {
	// General Settings
	enableAccessEvents: boolean;
	enableMultiVisitPassRemoval: boolean;

	// Access Profile Settings
	grantFacilityAccess: boolean;

	// Forgot Access Media Settings
	forgotAccessMediaLimit: number;
	allowFacilityAccessExceedLimit: boolean;

	// Group Access
	enableAnonymousGroupAccess: boolean;
	enableGroupAccessOrganizations: boolean;
	enableGroupAccessMembers: boolean;

	// Passback Settings
	enablePassbackWarnings: boolean;
	warningPeriodMinutes: number;
	allowFacilityAccessPassback: boolean;
	enablePassbackWarningsMultiVisit: boolean;
}

export interface SuspensionConfig {
	// RecIt Defaults
	suspendFromFacilityAccessRecIt: boolean;
	suspendFromIntramuralsRecIt: boolean;
	suspendFromProgramsRecIt: boolean;
	suspendFromBookingsRecIt: boolean;

	// Intramural Defaults
	suspendFromFacilityAccessIntramural: boolean;
	suspendFromIntramuralsIntramural: boolean;
	suspendFromProgramsIntramural: boolean;
	suspendFromBookingsIntramural: boolean;
}

const DEFAULT_ACCESS_CONFIG: AccessConfig = {
	enableAccessEvents: true,
	enableMultiVisitPassRemoval: true,
	grantFacilityAccess: true,
	forgotAccessMediaLimit: 3,
	allowFacilityAccessExceedLimit: false,
	enableAnonymousGroupAccess: false,
	enableGroupAccessOrganizations: true,
	enableGroupAccessMembers: true,
	enablePassbackWarnings: true,
	warningPeriodMinutes: 3,
	allowFacilityAccessPassback: false,
	enablePassbackWarningsMultiVisit: false,
};

const DEFAULT_SUSPENSION_CONFIG: SuspensionConfig = {
	suspendFromFacilityAccessRecIt: false,
	suspendFromIntramuralsRecIt: false,
	suspendFromProgramsRecIt: false,
	suspendFromBookingsRecIt: false,
	suspendFromFacilityAccessIntramural: false,
	suspendFromIntramuralsIntramural: false,
	suspendFromProgramsIntramural: false,
	suspendFromBookingsIntramural: false,
};

const STORAGE_KEY = "rec-it-access-config";

export function useAccessConfig() {
	const [accessConfig, setAccessConfig] = useState<AccessConfig>(
		DEFAULT_ACCESS_CONFIG
	);
	const [suspensionConfig, setSuspensionConfig] = useState<SuspensionConfig>(
		DEFAULT_SUSPENSION_CONFIG
	);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setAccessConfig({
					...DEFAULT_ACCESS_CONFIG,
					...parsed.accessConfig,
				});
				setSuspensionConfig({
					...DEFAULT_SUSPENSION_CONFIG,
					...parsed.suspensionConfig,
				});
			} catch (e) {
				console.error("Failed to parse Access config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveState = (
		newAccess: AccessConfig,
		newSuspension: SuspensionConfig
	) => {
		setAccessConfig(newAccess);
		setSuspensionConfig(newSuspension);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				accessConfig: newAccess,
				suspensionConfig: newSuspension,
			})
		);
	};

	const updateAccessConfig = (updates: Partial<AccessConfig>) => {
		saveState({ ...accessConfig, ...updates }, suspensionConfig);
	};

	const updateSuspensionConfig = (updates: Partial<SuspensionConfig>) => {
		saveState(accessConfig, { ...suspensionConfig, ...updates });
	};

	const resetConfig = () => {
		saveState(DEFAULT_ACCESS_CONFIG, DEFAULT_SUSPENSION_CONFIG);
	};

	return {
		accessConfig,
		suspensionConfig,
		updateAccessConfig,
		updateSuspensionConfig,
		resetConfig,
		isLoaded,
	};
}
