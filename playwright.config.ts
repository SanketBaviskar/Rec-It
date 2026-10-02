import { defineConfig } from "@playwright/test";

// The e2e tests drive the real app against a running Rec-It-backend
// (default http://localhost:3000/api, seeded with `npm run seed`).
export default defineConfig({
  testDir: "e2e",
  use: {
    baseURL: "http://localhost:5123",
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: "npm run dev:react",
    url: "http://localhost:5123",
    reuseExistingServer: true,
  },
});
