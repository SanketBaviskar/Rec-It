import { expect, test, type Page } from "@playwright/test";

// Seeded by Rec-It-backend `npm run seed`
const email = process.env.E2E_EMAIL ?? "admin@rec-it.com";
const password = process.env.E2E_PASSWORD ?? "admin123";

async function logIn(page: Page) {
  await page.goto("/");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
}

test("shows an error for a wrong password and stays on the login page", async ({ page }) => {
  page.on("dialog", () => {
    throw new Error("No alert should pop up for a wrong password");
  });
  await page.goto("/");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill("not-the-password");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("Invalid email or password")).toBeVisible();
  await expect(page).toHaveURL(/\/$/);
});

test("logs in and stores the token", async ({ page }) => {
  await logIn(page);
  expect(await page.evaluate(() => localStorage.getItem("token"))).toBeTruthy();
});

test("lists inventories from the backend in the admin dashboard", async ({ page }) => {
  await logIn(page);
  const inventories = page.waitForResponse(
    (r) => r.url().includes("/api/inventories") && r.status() === 200
  );
  await page.goto("/admin-dashboard");
  await page.getByText("Inventory Management").click();
  await page.getByText("Manage Inventory").click();
  const body = await (await inventories).json();
  const first = body.data.items.find(
    (inv: { equipments: unknown[] }) => inv.equipments.length > 0
  );
  await page.getByText(first.name, { exact: true }).first().click();

  // Opening a piece of equipment loads its details and tracked items
  const equipment = page.waitForResponse(
    (r) => /\/api\/equipments\/\d+$/.test(r.url()) && r.status() === 200
  );
  await page.getByText(first.equipments[0].name, { exact: true }).click();
  await equipment;
  await expect(page.getByRole("heading", { name: /^Items \(\d+\)$/ })).toBeVisible();
});

test("searches members through the backend", async ({ page }) => {
  await logIn(page);
  await page.getByRole("button", { name: "search" }).click();
  const search = page.waitForResponse(
    (r) => r.url().includes("/api/users") && r.request().method() === "GET"
  );
  await page.getByLabel("Search Input").first().fill("Admin");
  await page.getByLabel("Search Input").first().press("Enter");
  expect((await search).status()).toBe(200);
  await expect(page.getByText("Admin User").first()).toBeVisible();
});
