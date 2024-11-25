import apiClient from "@/Services/Utils/apiClient";

export const searchUsers = async (query: string): Promise<any[]> => {
  if (!query.trim()) {
    return [];
  }
  try {
    const response = await apiClient.get("/users/", {
      params: { search: query },
    });
    console.log(response.data.data.items);
    return response.data.data.items
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Let the interceptor handle global errors
  }
};
