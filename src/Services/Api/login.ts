import apiClient from "../Utils/apiClient";

export const login = async (email: string, password: string) => {
  try {
    // Ensure data is sent as an object
    const response = await apiClient.post("/users/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Propagate error to handle it in the component
  }
};
