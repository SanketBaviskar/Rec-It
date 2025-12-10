import apiClient from "@/Services/Utils/apiClient";

export interface Reservation {
	id: number;
	facilityId: number;
	userId: number | null;
	title: string;
	startTime: string; // ISO string
	endTime: string;
	type: "booking" | "maintenance" | "event";
	status: "confirmed" | "cancelled" | "pending";
	attendees?: number;
	description?: string;
	user?: {
		firstName: string;
		lastName: string;
		email: string;
	};
	createdAt: string;
	updatedAt: string;
}

export interface CreateReservationDto {
	facilityId: number;
	title: string;
	startTime: string; // ISO string
	endTime: string; // ISO string
	userId?: number;
	type?: string;
	description?: string;
	attendees?: number;
}

export const fetchReservations = async (
	facilityId?: number,
	start?: Date,
	end?: Date
): Promise<Reservation[]> => {
	try {
		const params: any = {};
		if (facilityId) params.facilityId = facilityId;
		if (start) params.start = start.toISOString();
		if (end) params.end = end.toISOString();

		const response = await apiClient.get("/reservations", { params });
		return response.data.data.items;
	} catch (error) {
		console.error("Error fetching reservations:", error);
		throw error;
	}
};

export const createReservation = async (
	data: CreateReservationDto
): Promise<Reservation> => {
	try {
		const response = await apiClient.post("/reservations", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating reservation:", error);
		throw error;
	}
};

export const updateReservation = async (
	id: number,
	data: Partial<CreateReservationDto>
): Promise<Reservation> => {
	try {
		const response = await apiClient.put(`/reservations/${id}`, data);
		return response.data.data;
	} catch (error) {
		console.error(`Error updating reservation ${id}:`, error);
		throw error;
	}
};

export const deleteReservation = async (id: number): Promise<void> => {
	try {
		await apiClient.delete(`/reservations/${id}`);
	} catch (error) {
		console.error(`Error deleting reservation ${id}:`, error);
		throw error;
	}
};
