import { describe, expect, it } from "vitest";
import { toMemberPayload } from "./addNewMember";
import { MemberData } from "@/Interface/memberData";

const blankMember: MemberData = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  accessId: "",
  dateOfBirth: "",
  gender: "",
};

describe("toMemberPayload", () => {
  it("drops blank optional fields so unique accessId never collides on empty string", () => {
    const payload = toMemberPayload({
      ...blankMember,
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });
    expect(payload).toEqual({
      firstName: "Ada",
      lastName: "Lovelace",
      email: "ada@example.com",
    });
  });

  it("converts the date of birth to ISO and trims values", () => {
    const payload = toMemberPayload({
      ...blankMember,
      firstName: " Ada ",
      dateOfBirth: "1990-05-01",
    });
    expect(payload.firstName).toBe("Ada");
    expect(payload.dateOfBirth).toBe("1990-05-01T00:00:00.000Z");
  });
});
