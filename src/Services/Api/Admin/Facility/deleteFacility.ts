import apiClient from "@/Services/Utils/apiClient";

export const deleteFacility = async (id: number): Promise<void> => {
	await apiClient.delete(`/facilities/${id}`);
};
