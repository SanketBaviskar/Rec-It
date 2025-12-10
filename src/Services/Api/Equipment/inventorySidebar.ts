import apiClient from "@/Services/Utils/apiClient";

export const fetchInventoryCategories = async (queryParams?: any) => {
	try {
		const response = await apiClient.get("/inventories/", {
			params: queryParams,
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching inventory categories:", error);
		throw error;
	}
};
