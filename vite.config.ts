import { defineConfig } from "vitest/config";

export default defineConfig({
    base: "/draw_tool/",
    test: {
        globals: true,
        include: [
            "src/tests/unit/**",
            "src/tests/integration/**",
        ],
    },
});
