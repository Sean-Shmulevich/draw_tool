import { defineConfig } from "vitest/config";

export default defineConfig({
    base: "/draw_tool/",
    test: {
        globals: true,
        exclude: [
            "node_modules",
            "src/tests/e2e/**",   // 👈 prevent Vitest from touching Playwright tests
        ],
    },
});
