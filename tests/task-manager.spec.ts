import { test, expect } from "@playwright/test";

// Navigate to the app before each test
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:5173/");
});

test("user selects 'Basic Task' and adds a task", async ({ page }) => {
  // Go to the page and check title is visible
  await expect(page.getByText("Task Manager")).toBeVisible();

  // Open the dropdown and ensure it renders
  await page.getByRole("button", { name: "Select type of task" }).click();
  await expect(page.getByText("Tasks", { exact: true })).toBeVisible();

  // Select 'Basic Task' and ensure the title input appears
  await page.getByRole("menuitem", { name: "Basic Task" }).click();
  await expect(page.getByPlaceholder("Task Title")).toBeVisible();

  // Click on the title input to trigger the description input
  await page.getByPlaceholder("Task Title").click();
  await expect(page.getByPlaceholder("Description (optional)")).toBeVisible();

  // Verify that Add Task button is disabled before typing
  await expect(page.getByRole("button", { name: /Add Task/i })).toBeDisabled();

  // Fill in the task title and confirm the Add button becomes enabled
  await page.getByPlaceholder("Task Title").fill("Clean my room");
  await expect(page.getByRole("button", { name: /Add Task/i })).toBeEnabled();

  // Optionally: Fill in description and click Add Task
  await page
    .getByPlaceholder("Description (optional)")
    .fill("Every Saturday morning");
  await page.getByRole("button", { name: /Add Task/i }).click();

  // Optionally: Check that task was added to the UI
  await expect(page.getByText("Clean my room")).toBeVisible();

  // Click the Dete Button and expect the task to be hidden
  await page.getByRole("button", { name: "Delete task" }).click();

  await expect(page.getByText("Clean my room")).toBeHidden();

  // Click the X Button and expect the Basic Task Input to be hidden
  await page.getByRole("button").filter({ hasText: /^$/ }).click();

  await expect(page.getByPlaceholder("Task Title")).toBeHidden();
});

test("user selects 'Timed Task' and adds a task", async ({ page }) => {
  await expect(page.getByText("Task Manager")).toBeVisible();

  await page.getByRole("button", { name: "Select type of task" }).click();
  await expect(page.getByText("Tasks", { exact: true })).toBeVisible();

  await page.getByRole("menuitem", { name: "Timed Task" }).click();
  await expect(page.getByPlaceholder("Task Title")).toBeVisible();

  await page.getByPlaceholder("Task Title").click();
  await expect(page.getByPlaceholder("Description (optional)")).toBeVisible();

  await expect(
    page.getByRole("button", { name: /Add Timed Task/i })
  ).toBeDisabled();

  await page.getByPlaceholder("Task Title").fill("Attend Tech Show");
  await page
    .getByPlaceholder("Description (optional)")
    .fill("Yearly event so very important");

  await page.getByRole("button", { name: "Select due date" }).click();
  await page.getByRole("button", { name: "Friday, May 16th," }).click();

  const addButton = page.getByRole("button", { name: /Add Timed Task/i });
  await expect(addButton).toBeEnabled();
  await addButton.click();

  await expect(page.getByText("Attend Tech Show")).toBeVisible();
  await expect(page.getByText("Yearly event so very important")).toBeVisible();
  await expect(page.getByText("Task Due: 05/16/")).toBeVisible();

  await page.getByRole("button", { name: "Delete task" }).click();

  await expect(page.getByText("Attend Tech Show")).toBeHidden();
  await expect(page.getByText("Yearly event so very important")).toBeHidden();
  await expect(page.getByText("Task Due: 05/16/")).toBeHidden();

  await page.getByRole("button").filter({ hasText: /^$/ }).click();

  await expect(page.getByPlaceholder("Task Title")).toBeHidden();
});
