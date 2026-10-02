import { MemberData } from "@/Interface/memberData";
import apiClient from "@/Services/Utils/apiClient"

// Blank optional fields must not be sent: accessId is unique, so "" would
// clash on the second member, and "" is not a valid dateOfBirth
export const toMemberPayload = (memberData: MemberData) => {
  const payload: Record<string, string> = {};
  for (const [key, value] of Object.entries(memberData)) {
    const trimmed = typeof value === "string" ? value.trim() : value;
    if (trimmed) payload[key] = trimmed;
  }
  if (payload.dateOfBirth) {
    payload.dateOfBirth = new Date(payload.dateOfBirth).toISOString();
  }
  return payload;
};

export const addMember = async (memberData: MemberData) => {
  try {
    const response = await apiClient.post("/users/addUser", toMemberPayload(memberData));
    return response.data;
  } catch (error) {
    console.error("Error adding member:", error);
    throw error; // Propagate error to handle it in the component
  }
};
