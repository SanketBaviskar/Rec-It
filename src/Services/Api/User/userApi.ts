import apiClient from "@/services/Utils/apiClient";

export interface User {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	status:
		| "active"
		| "inactive"
		| "suspended"
		| "expired"
		| "banned"
		| "archived";
	role: string; // "0" for user, "1"-"3" for staff/admin
	dateOfBirth?: string;
	address?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	emergencyContactName?: string;
	emergencyContactPhone?: string;
	createdAt: string;
	updatedAt: string;
	memberships?: any[]; // Defined in membershipApi
	userPasses?: any[]; // Defined in passApi
}

export interface CreateUserDTO {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber?: string;
	password?: string;
	role?: string;
	dateOfBirth?: string;
	address?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	emergencyContactName?: string;
	emergencyContactPhone?: string;
	membershipId?: number; // Optional initial membership
}

export interface UpdateUserDTO extends Partial<CreateUserDTO> {
	status?:
		| "active"
		| "inactive"
		| "suspended"
		| "expired"
		| "banned"
		| "archived";
}

/**
 * Get all users with pagination and filtering
 */
export const getAllUsers = async (params?: {
	page?: number;
	limit?: number;
	cursor?: number | null;
	search?: string;
	role?: string;
	status?: string;
}): Promise<{
	users: User[];
	nextCursor: number | null;
	hasMore: boolean;
	totalCount: number;
}> => {
	try {
		const response = await apiClient.get("/users", { params });
		// Handle response structure normalization
		const data = response.data?.data || response.data;

		return {
			users: data.users || data.items || [],
			nextCursor: data.nextCursor || null,
			hasMore: data.hasMore || false,
			totalCount: data.totalCount || 0,
		};
	} catch (error) {
		console.error("Error fetching users:", error);
		throw error;
	}
};

/**
 * Get a single user by ID
 */
export const getUserById = async (id: number): Promise<User> => {
	try {
		const response = await apiClient.get(`/users/${id}`);
		return response.data?.data || response.data;
	} catch (error) {
		console.error("Error fetching user:", error);
		throw error;
	}
};

/**
 * Create a new user
 */
export const createUser = async (data: CreateUserDTO): Promise<User> => {
	try {
		const response = await apiClient.post("/users", data);
		return response.data?.data || response.data;
	} catch (error) {
		console.error("Error creating user:", error);
		throw error;
	}
};

/**
 * Update an existing user
 */
export const updateUser = async (
	id: number,
	data: UpdateUserDTO
): Promise<User> => {
	try {
		// Ensure we don't send undefined fields
		const cleanData = Object.fromEntries(
			Object.entries(data).filter(
				([_, v]) => v !== undefined && v !== null && v !== ""
			)
		);
		const response = await apiClient.put(`/users/${id}`, cleanData);
		return response.data?.data || response.data;
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
};

/**
 * Delete a user
 */
export const deleteUser = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/users/${id}`);
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
};

/**
 * Update user status
 */
export const updateUserStatus = async (
	id: number,
	status: string
): Promise<User> => {
	try {
		const response = await apiClient.patch(`/users/${id}/status`, {
			status,
		});
		return response.data?.data || response.data;
	} catch (error) {
		console.error("Error updating user status:", error);
		throw error;
	}
};
