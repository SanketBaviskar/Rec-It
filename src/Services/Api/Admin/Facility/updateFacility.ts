import apiClient from "@/Services/Utils/apiClient";
import { Facility } from "@/Services/Api/Facility/facilityApi";
import { CreateFacilityDto } from "./addFacility";

export const updateFacility = async (
	id: number,
	data: Partial<CreateFacilityDto>
): Promise<Facility> => {
	const response = await apiClient.put(`/facilities/${id}`, data);
	return response.data.data;
};
