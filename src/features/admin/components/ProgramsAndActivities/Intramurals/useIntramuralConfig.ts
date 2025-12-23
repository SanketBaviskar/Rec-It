import { useState, useEffect } from "react";

export interface SportType {
	id: number;
	name: string;
	teamsPerLeague: number;
	playersPerTeam: number;
	active: boolean;
}

export interface IntramuralConfig {
	// Registration Settings
	registrationOpenDays: number;
	registrationCloseDays: number;
	allowLateRegistration: boolean;
	lateRegistrationFee: number;

	// Team Settings
	minPlayersToStart: number;
	allowFreeAgents: boolean;
	freeAgentDeadlineDays: number;

	// Eligibility
	requireActiveMembers: boolean;
	allowGuestPlayers: boolean;
	maxGuestsPerTeam: number;
	requireWaiver: boolean;

	// Scheduling
	defaultGameLength: number;
	timeBetweenGames: number;
	allowReschedule: boolean;
	rescheduleDeadlineHours: number;

	// Forfeit Policy
	forfeitWaitMinutes: number;
	forfeitPenaltyPoints: number;
	maxForfeitsBeforeRemoval: number;

	// Scoring & Standings
	winPoints: number;
	tiePoints: number;
	lossPoints: number;
	tiebreaker: "headToHead" | "pointDiff" | "pointsScored" | "coinFlip";
}

const DEFAULT_SPORTS: SportType[] = [
	{
		id: 1,
		name: "Basketball",
		teamsPerLeague: 8,
		playersPerTeam: 12,
		active: true,
	},
	{
		id: 2,
		name: "Soccer",
		teamsPerLeague: 10,
		playersPerTeam: 18,
		active: true,
	},
	{
		id: 3,
		name: "Volleyball",
		teamsPerLeague: 8,
		playersPerTeam: 10,
		active: true,
	},
	{
		id: 4,
		name: "Flag Football",
		teamsPerLeague: 8,
		playersPerTeam: 15,
		active: true,
	},
	{
		id: 5,
		name: "Softball",
		teamsPerLeague: 6,
		playersPerTeam: 15,
		active: false,
	},
];

const DEFAULT_CONFIG: IntramuralConfig = {
	registrationOpenDays: 14,
	registrationCloseDays: 3,
	allowLateRegistration: true,
	lateRegistrationFee: 25.0,
	minPlayersToStart: 5,
	allowFreeAgents: true,
	freeAgentDeadlineDays: 7,
	requireActiveMembers: true,
	allowGuestPlayers: false,
	maxGuestsPerTeam: 2,
	requireWaiver: true,
	defaultGameLength: 60,
	timeBetweenGames: 15,
	allowReschedule: true,
	rescheduleDeadlineHours: 48,
	forfeitWaitMinutes: 10,
	forfeitPenaltyPoints: 2,
	maxForfeitsBeforeRemoval: 3,
	winPoints: 3,
	tiePoints: 1,
	lossPoints: 0,
	tiebreaker: "headToHead",
};

const STORAGE_KEY = "rec-it-intramural-config";

export function useIntramuralConfig() {
	const [sports, setSports] = useState<SportType[]>(DEFAULT_SPORTS);
	const [config, setConfig] = useState<IntramuralConfig>(DEFAULT_CONFIG);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setSports(parsed.sports || DEFAULT_SPORTS);
				setConfig(parsed.config || DEFAULT_CONFIG);
			} catch (e) {
				console.error("Failed to parse Intramural config", e);
			}
		}
		setIsLoaded(true);
	}, []);

	const saveConfig = (
		newSports: SportType[],
		newConfig: IntramuralConfig
	) => {
		setSports(newSports);
		setConfig(newConfig);
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				sports: newSports,
				config: newConfig,
			})
		);
	};

	const updateConfig = (updates: Partial<IntramuralConfig>) => {
		saveConfig(sports, { ...config, ...updates });
	};

	const addSport = (sport: Omit<SportType, "id">) => {
		const newId = Math.max(0, ...sports.map((s) => s.id)) + 1;
		saveConfig([...sports, { ...sport, id: newId }], config);
	};

	const updateSport = (id: number, updates: Partial<SportType>) => {
		saveConfig(
			sports.map((s) => (s.id === id ? { ...s, ...updates } : s)),
			config
		);
	};

	const removeSport = (id: number) => {
		saveConfig(
			sports.filter((s) => s.id !== id),
			config
		);
	};

	const resetConfig = () => {
		saveConfig(DEFAULT_SPORTS, DEFAULT_CONFIG);
	};

	return {
		sports,
		config,
		updateConfig,
		addSport,
		updateSport,
		removeSport,
		resetConfig,
		isLoaded,
	};
}
