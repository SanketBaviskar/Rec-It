import apiClient from "@/Services/Utils/apiClient";
import { Facility } from "@/Services/Api/Facility/facilityApi";

export interface CreateFacilityDto {
	name: string;
	description?: string;
	capacity: number;
	location: string;
	manager: string;
	type: string;
}

export const addFacility = async (
	data: CreateFacilityDto
): Promise<Facility> => {
	const response = await apiClient.post("/facilities", data);
	return response.data.data;
};
