import apiClient from "@/Services/Utils/apiClient";

export interface FacilityItem {
	id: number;
	facilityId: number;
	name: string;
	status: string;
	createdAt: string;
	updatedAt: string;
}

export const getFacilityItems = async (
	facilityId: number
): Promise<FacilityItem[]> => {
	try {
		const response = await apiClient.get(`/facilities/${facilityId}/items`);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching facility items:", error);
		throw error;
	}
};
