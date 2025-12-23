import apiClient from "@/services/Utils/apiClient";

// Types
export interface Pass {
	id: number;
	name: string;
	passCategory: "punch_card" | "guest_pass" | "day_pass";
	description: string | null;
	price: number;
	memberPrice: number | null;
	visits: number;
	expiryDays: number | null;
	expiryUnit: "Days" | "Months" | "Years" | null;
	active: boolean;
	requiresWaiver: boolean;
	requiresSponsor: boolean;
	maxPerMember: number;
	accessAllZones: boolean;
	allowedZoneIds: number[];
	validHoursStart: string | null;
	validHoursEnd: string | null;
	kioskEnabled: boolean;
	qrCodeEnabled: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreatePassDTO {
	name: string;
	passCategory: "punch_card" | "guest_pass" | "day_pass";
	description?: string;
	price: number;
	memberPrice?: number;
	visits?: number;
	expiryDays?: number;
	expiryUnit?: "Days" | "Months" | "Years";
	active?: boolean;
	requiresWaiver?: boolean;
	requiresSponsor?: boolean;
	maxPerMember?: number;
	accessAllZones?: boolean;
	allowedZoneIds?: number[];
	validHoursStart?: string;
	validHoursEnd?: string;
	kioskEnabled?: boolean;
	qrCodeEnabled?: boolean;
}

export interface UpdatePassDTO extends Partial<CreatePassDTO> {}

export interface UserPass {
	id: number;
	userId: number;
	passId: number;
	visitsTotal: number;
	visitsUsed: number;
	visitsRemaining: number;
	purchaseDate: string;
	expiryDate: string | null;
	status: "active" | "expired" | "depleted" | "cancelled";
	sponsorId: number | null;
	guestName: string | null;
	guestEmail: string | null;
	guestPhone: string | null;
	transactionId: number | null;
	pass?: Pass;
}

export interface PurchasePassDTO {
	userId: number;
	passId: number;
	guestName?: string;
	guestEmail?: string;
	guestPhone?: string;
	sponsorId?: number;
	transactionId?: number;
}

// API Functions

/**
 * Get all pass types
 */
export const getAllPasses = async (): Promise<Pass[]> => {
	try {
		const response = await apiClient.get("/passes/");
		const data = response.data?.data;
		return Array.isArray(data) ? data : [];
	} catch (error) {
		console.error("Error fetching passes:", error);
		throw error;
	}
};

/**
 * Get a single pass by ID
 */
export const getPassById = async (id: number): Promise<Pass> => {
	try {
		const response = await apiClient.get(`/passes/${id}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching pass:", error);
		throw error;
	}
};

/**
 * Create a new pass type
 */
export const createPass = async (data: CreatePassDTO): Promise<Pass> => {
	try {
		const response = await apiClient.post("/passes/", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating pass:", error);
		throw error;
	}
};

/**
 * Update an existing pass type
 */
export const updatePass = async (
	id: number,
	data: UpdatePassDTO
): Promise<Pass> => {
	try {
		const response = await apiClient.put(`/passes/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error("Error updating pass:", error);
		throw error;
	}
};

/**
 * Delete a pass type
 */
export const deletePass = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/passes/${id}`);
	} catch (error) {
		console.error("Error deleting pass:", error);
		throw error;
	}
};

/**
 * Purchase a pass for a user
 */
export const purchasePass = async (
	data: PurchasePassDTO
): Promise<UserPass> => {
	try {
		const response = await apiClient.post("/passes/purchase", data);
		return response.data.data;
	} catch (error) {
		console.error("Error purchasing pass:", error);
		throw error;
	}
};

/**
 * Use a visit from a user's pass
 */
export const usePassVisit = async (userPassId: number): Promise<UserPass> => {
	try {
		const response = await apiClient.post(`/passes/use/${userPassId}`);
		return response.data.data;
	} catch (error) {
		console.error("Error using pass visit:", error);
		throw error;
	}
};

/**
 * Get all passes for a user
 */
export const getUserPasses = async (userId: number): Promise<UserPass[]> => {
	try {
		const response = await apiClient.get(`/passes/user/${userId}`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching user passes:", error);
		throw error;
	}
};

/**
 * Get active passes for a user (for check-in)
 */
export const getActiveUserPasses = async (
	userId: number
): Promise<UserPass[]> => {
	try {
		const response = await apiClient.get(`/passes/user/${userId}/active`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching active passes:", error);
		throw error;
	}
};
