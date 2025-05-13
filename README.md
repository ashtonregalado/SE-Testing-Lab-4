# Application Setup & Testing Guide

## Running Tests

### Start the backend sever before testing

```bash
cd backend
```

```bash
npm run dev
```

### Option 1: Interactive UI Testing

```bash
npx playwright test --ui
```

This option provides a visual walkthrough of each test step, allowing you to see what happens before, during, and after each step.

### Option 2: Headed Mode Testing (With Browser)

1. Install Playwright as an extension in VS Code
2. In the left sidebar, click the **TESTING** tab, then select the **PLAYWRIGHT** button
3. Select **Show browser**
4. Click the **Run Test** button to execute the test

#### Browser Configuration

To use Firefox instead of the default Chromium:

1. Open `playwright.config.js` file
2. Uncomment the Firefox option in the projects section
3. Comment out the Chromium option

![Example Setup](<Screenshot 2025-05-13 132604.png>)

## Running the Application

### Frontend Setup

```bash
# In the root directory
npm i
npm run dev
```

### Backend Setup

```bash
# In another terminal
cd backend
npm i
npm run dev
```
