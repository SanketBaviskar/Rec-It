import { UserData } from "@/Interface/memberData";
import apiClient from "@/Services/Utils/apiClient";

// Shape of a user in GET /users (see Rec-It-backend userService.userList)
export interface ApiUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  avatar: string | null;
  studentId: number | null;
  memberships?: { membership: { name: string } }[];
}

export const toUserData = (user: ApiUser): UserData => ({
  id: String(user.id),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  phoneNumber: user.phone ?? "",
  avatarUrl: user.avatar ?? undefined,
  membershipType: user.memberships?.[0]?.membership.name ?? "No membership",
  studentId: user.studentId?.toString() ?? "",
});

export const searchUsers = async (query: string): Promise<UserData[]> => {
  if (!query.trim()) {
    return [];
  }
  try {
    const response = await apiClient.get("/users/", {
      params: { search: query, limit: 25 },
    });
    return (response.data.data.users as ApiUser[]).map(toUserData);
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Let the interceptor handle global errors
  }
};
