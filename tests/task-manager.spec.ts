import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await expect(page.getByText("Task Manager")).toBeVisible;
});

test("has text", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page.getByRole("button", { name: "Select type of task" }).click();

  await expect(page.getByText("Tasks", { exact: true })).toBeVisible();
});
