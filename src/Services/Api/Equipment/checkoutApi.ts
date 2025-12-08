import apiClient from "@/services/Utils/apiClient";

// Types for API responses
export interface EquipmentItemResponse {
	id: number;
	equipmentId: number;
	serialNumber: string | null;
	barcode: string | null;
	status: "available" | "checked_out" | "maintenance" | "retired";
	condition: "new" | "good" | "fair" | "poor";
	purchaseDate: string | null;
	notes: string | null;
	createdAt: string;
	updatedAt: string;
	equipment: {
		id: number;
		name: string;
		code: string;
		image: string | null;
	};
}

export interface CheckoutRecord {
	id: number;
	equipmentItemId: number;
	userId: number;
	checkedOutBy: number;
	checkedOutAt: string;
	dueAt: string | null;
	checkedInAt: string | null;
	checkedInBy: number | null;
	conditionOut: string | null;
	conditionIn: string | null;
	notes: string | null;
	equipmentItem: {
		id: number;
		serialNumber: string | null;
		barcode: string | null;
		status: string;
		condition: string;
		equipment: {
			id: number;
			name: string;
			code: string;
			image: string | null;
		};
	};
	user?: {
		id: number;
		firstName: string;
		lastName: string;
		email: string;
	};
}

interface ApiResponse<T> {
	status: string;
	data: T;
	message: string;
}

// --- Equipment Items API ---

// Get all equipment items (optionally filter by equipmentId or status)
export const fetchEquipmentItems = async (
	equipmentId?: number,
	status?: string
): Promise<ApiResponse<EquipmentItemResponse[]>> => {
	const params = new URLSearchParams();
	if (equipmentId) params.append("equipmentId", equipmentId.toString());
	if (status) params.append("status", status);

	const response = await apiClient.get(
		`/equipment-checkout/items?${params.toString()}`
	);
	return response.data;
};

// Get a single equipment item
export const fetchEquipmentItemById = async (
	id: number
): Promise<ApiResponse<EquipmentItemResponse>> => {
	const response = await apiClient.get(`/equipment-checkout/items/${id}`);
	return response.data;
};

// Create a new equipment item
export const createEquipmentItem = async (data: {
	equipmentId: number;
	serialNumber?: string;
	barcode?: string;
	status?: string;
	condition?: string;
	purchaseDate?: string;
	notes?: string;
}): Promise<ApiResponse<EquipmentItemResponse>> => {
	const response = await apiClient.post("/equipment-checkout/items", data);
	return response.data;
};

// --- Checkout API ---

// Checkout equipment to a member
export const checkoutEquipment = async (data: {
	equipmentItemId: number;
	userId: number;
	staffId?: number;
	dueAt?: string;
	notes?: string;
}): Promise<ApiResponse<CheckoutRecord>> => {
	const response = await apiClient.post("/equipment-checkout/checkout", data);
	return response.data;
};

// Check in equipment
export const checkinEquipment = async (
	checkoutId: number,
	data: {
		conditionIn?: string;
		notes?: string;
		staffId?: number;
	}
): Promise<ApiResponse<CheckoutRecord>> => {
	const response = await apiClient.put(
		`/equipment-checkout/checkout/${checkoutId}/checkin`,
		data
	);
	return response.data;
};

// Get all checkouts (optionally filter by userId or active only)
export const fetchCheckouts = async (
	userId?: number,
	activeOnly?: boolean
): Promise<ApiResponse<CheckoutRecord[]>> => {
	const params = new URLSearchParams();
	if (userId) params.append("userId", userId.toString());
	if (activeOnly) params.append("active", "true");

	const response = await apiClient.get(
		`/equipment-checkout/checkouts?${params.toString()}`
	);
	return response.data;
};

// Get user's active checkouts
export const fetchUserActiveCheckouts = async (
	userId: number
): Promise<ApiResponse<CheckoutRecord[]>> => {
	const response = await apiClient.get(
		`/equipment-checkout/checkouts/user/${userId}`
	);
	return response.data;
};

// Get overdue checkouts
export const fetchOverdueCheckouts = async (): Promise<
	ApiResponse<CheckoutRecord[]>
> => {
	const response = await apiClient.get(
		"/equipment-checkout/checkouts/overdue"
	);
	return response.data;
};
