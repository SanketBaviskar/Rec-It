import { describe, expect, it } from "vitest";
import { toUserData } from "./searchUser";

describe("toUserData", () => {
  it("maps the backend user to what the search UI renders", () => {
    expect(
      toUserData({
        id: 7,
        email: "sam@example.com",
        firstName: "Sam",
        lastName: "Lee",
        phone: "555-0100",
        avatar: null,
        studentId: 1234,
        memberships: [{ membership: { name: "Gold" } }],
      })
    ).toEqual({
      id: "7",
      email: "sam@example.com",
      firstName: "Sam",
      lastName: "Lee",
      phoneNumber: "555-0100",
      avatarUrl: undefined,
      membershipType: "Gold",
      studentId: "1234",
    });
  });

  it("handles members without a membership or student id", () => {
    const user = toUserData({
      id: 1,
      email: "a@example.com",
      firstName: "A",
      lastName: "B",
      phone: null,
      avatar: null,
      studentId: null,
      memberships: [],
    });
    expect(user.membershipType).toBe("No membership");
    expect(user.studentId).toBe("");
    expect(user.phoneNumber).toBe("");
  });
});
