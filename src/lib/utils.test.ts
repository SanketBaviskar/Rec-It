import { describe, expect, it } from "vitest";
import { AxiosError, AxiosHeaders } from "axios";
import { getErrorMessage } from "./utils";

describe("getErrorMessage", () => {
  it("uses the backend message when there is one", () => {
    const error = new AxiosError("Request failed", "ERR_BAD_REQUEST", undefined, undefined, {
      status: 409,
      statusText: "Conflict",
      headers: {},
      config: { headers: new AxiosHeaders() },
      data: { message: "Email already exists" },
    });
    expect(getErrorMessage(error, "fallback")).toBe("Email already exists");
  });

  it("falls back for network and non-axios errors", () => {
    expect(getErrorMessage(new AxiosError("Network Error"), "fallback")).toBe("fallback");
    expect(getErrorMessage(new Error("boom"), "fallback")).toBe("fallback");
  });
});
