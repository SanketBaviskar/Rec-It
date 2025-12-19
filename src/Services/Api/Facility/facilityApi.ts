import apiClient from "@/Services/Utils/apiClient";

export interface Facility {
	id: number;
	name: string;
	description: string | null;
	capacity: number;
	location: string;
	manager: string;
	type: string | null;
	categoryId: number | null;
	createdAt: string;
	updatedAt: string;
	items?: {
		id: number;
		facilityId: number;
		name: string;
		status: "available" | "maintenance" | "closed";
	}[];
}

export const fetchFacilities = async (type?: string): Promise<Facility[]> => {
	try {
		const response = await apiClient.get("/facilities", {
			params: { type: type === "all" ? undefined : type },
		});
		// Backend wraps arrays in { items: [] }
		const result = response.data.data;
		return result.items || result;
	} catch (error) {
		console.error("Error fetching facilities:", error);
		throw error;
	}
};

export const fetchFacilityById = async (id: number): Promise<Facility> => {
	try {
		const response = await apiClient.get(`/facilities/${id}`);
		return response.data.data;
	} catch (error) {
		console.error(`Error fetching facility ${id}:`, error);
		throw error;
	}
};

export const createFacility = async (
	data: Partial<Facility> & { categoryId?: number }
): Promise<Facility> => {
	try {
		const response = await apiClient.post("/facilities", data);
		return response.data.data;
	} catch (error) {
		console.error("Error creating facility:", error);
		throw error;
	}
};

export const deleteFacility = async (id: string | number): Promise<void> => {
	try {
		// Backend expects ID to be integer usually, handle string if needed
		await apiClient.delete(`/facilities/${id}`);
	} catch (error) {
		console.error(`Error deleting facility ${id}:`, error);
		throw error;
	}
};
