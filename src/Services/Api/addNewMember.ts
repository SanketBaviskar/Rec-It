import { MemberData } from "@/types/memberData";
import apiClient from "@/services/Utils/apiClient"

export const addMember = async (memberData: MemberData) => {
  const date = new Date(memberData.dateOfBirth);
  memberData.dateOfBirth = date.toISOString()
  try {
    const response = await apiClient.post("/users/addUser", memberData);
    return response.data;
  } catch (error) {
    console.error("Error adding member:", error);
    throw error; // Propagate error to handle it in the component
  }
};
