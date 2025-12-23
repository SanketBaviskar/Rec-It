import apiClient from "@/services/Utils/apiClient";

// Types
export interface Membership {
	id: number;
	name: string;
	description: string | null;
	price: number | null;
	duration: "Monthly" | "Semester" | "Annual" | "One-Time";
	status: "Active" | "Archived";
	accessLevel: "Full" | "Limited" | "Student-Only";
	isFamilyPlan: boolean;
	maxYouthAge: number | null;

	// Billing & Renewal
	billingType: "recurring" | "fixed_term" | "one_time";
	isAutoRenew: boolean;
	renewalReminderDays: number;
	gracePeriodDays: number;
	prorationEnabled: boolean;

	// Rules & Security
	requiresWaiver: boolean;
	waiverTypes: string[];
	allowGuestPasses: boolean;
	maxGuestsPerVisit: number;
	requiresPhotoId: boolean;
	allowsPlusOne: boolean;

	// Access Hours
	hasRestrictedHours: boolean;
	allowedDays: string[];
	accessStartTime: string | null;
	accessEndTime: string | null;

	// Kiosk Settings
	kioskCheckInEnabled: boolean;
	kioskSelfRegistration: boolean;
	kioskDisplayMessage: string | null;

	// Access Zones
	accessAllZones: boolean;
	allowedZoneIds: number[];

	createdAt?: string;
	updatedAt?: string;
}

export interface CreateMembershipDTO {
	name: string;
	description?: string;
	price?: number;
	duration?: "Monthly" | "Semester" | "Annual" | "One-Time";
	status?: "Active" | "Archived";
	accessLevel?: "Full" | "Limited" | "Student-Only";
	isFamilyPlan?: boolean;
	maxYouthAge?: number | null;

	// Billing & Renewal
	billingType?: "recurring" | "fixed_term" | "one_time";
	isAutoRenew?: boolean;
	renewalReminderDays?: number;
	gracePeriodDays?: number;
	prorationEnabled?: boolean;

	// Rules & Security
	requiresWaiver?: boolean;
	waiverTypes?: string[];
	allowGuestPasses?: boolean;
	maxGuestsPerVisit?: number;
	requiresPhotoId?: boolean;
	allowsPlusOne?: boolean;

	// Access Hours
	hasRestrictedHours?: boolean;
	allowedDays?: string[];
	accessStartTime?: string | null;
	accessEndTime?: string | null;

	// Kiosk Settings
	kioskCheckInEnabled?: boolean;
	kioskSelfRegistration?: boolean;
	kioskDisplayMessage?: string | null;

	// Access Zones
	accessAllZones?: boolean;
	allowedZoneIds?: number[];
}

export interface UpdateMembershipDTO {
	name?: string;
	description?: string;
	price?: number;
	duration?: "Monthly" | "Semester" | "Annual" | "One-Time";
	status?: "Active" | "Archived";
	accessLevel?: "Full" | "Limited" | "Student-Only";
	isFamilyPlan?: boolean;
	maxYouthAge?: number | null;

	// Billing & Renewal
	billingType?: "recurring" | "fixed_term" | "one_time";
	isAutoRenew?: boolean;
	renewalReminderDays?: number;
	gracePeriodDays?: number;
	prorationEnabled?: boolean;

	// Rules & Security
	requiresWaiver?: boolean;
	waiverTypes?: string[];
	allowGuestPasses?: boolean;
	maxGuestsPerVisit?: number;
	requiresPhotoId?: boolean;
	allowsPlusOne?: boolean;

	// Access Hours
	hasRestrictedHours?: boolean;
	allowedDays?: string[];
	accessStartTime?: string | null;
	accessEndTime?: string | null;

	// Kiosk Settings
	kioskCheckInEnabled?: boolean;
	kioskSelfRegistration?: boolean;
	kioskDisplayMessage?: string | null;

	// Access Zones
	accessAllZones?: boolean;
	allowedZoneIds?: number[];
}

export interface AssignMembershipDTO {
	userId: number;
	membershipId: number;
	startDate: string;
	endDate?: string | null;
}

// API Functions

/**
 * Get all membership plans
 */
export const getAllMemberships = async (): Promise<Membership[]> => {
	try {
		const response = await apiClient.get("/memberships/");
		// Ensure we always return an array
		const data = response.data?.data;
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error("Error fetching memberships:", error);
		throw error;
	}
};

/**
 * Get a single membership by ID
 */
export const getMembershipById = async (id: number): Promise<Membership> => {
	try {
		const response = await apiClient.get(`/memberships/${id}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching membership:", error);
		throw error;
	}
};

/**
 * Create a new membership plan
 */
export const createMembership = async (
	data: CreateMembershipDTO
): Promise<Membership> => {
	try {
		const response = await apiClient.post("/memberships/", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating membership:", error);
		throw error;
	}
};

/**
 * Update an existing membership plan
 */
export const updateMembership = async (
	id: number,
	data: UpdateMembershipDTO
): Promise<Membership> => {
	try {
		const response = await apiClient.put(`/memberships/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error("Error updating membership:", error);
		throw error;
	}
};

/**
 * Delete a membership plan
 */
export const deleteMembership = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/memberships/${id}`);
	} catch (error) {
		console.error("Error deleting membership:", error);
		throw error;
	}
};

/**
 * Assign a membership to a user
 */
export const assignMembershipToUser = async (
	data: AssignMembershipDTO
): Promise<{ id: number; userId: number; membershipId: number }> => {
	try {
		const response = await apiClient.post(
			"/memberships/assignMembershipToUser",
			data
		);
		return response.data.data;
	} catch (error) {
		console.error("Error assigning membership:", error);
		throw error;
	}
};

/**
 * Get all memberships for a specific user
 */
export const getUserMemberships = async (
	userId: number
): Promise<Membership[]> => {
	try {
		const response = await apiClient.get(`/memberships/user/${userId}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching user memberships:", error);
		throw error;
	}
};
