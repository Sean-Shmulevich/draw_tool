import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/e2e",
  reporter: [
    ["list"],               // pretty console output
    ["html", { open: "never" }] // always generate HTML reports in ./playwright-report
  ],
  use: {
    baseURL: "http://localhost:5173", // vite default dev server
    headless: true,
  },
});
