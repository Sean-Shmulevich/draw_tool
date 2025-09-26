// tests/draw.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Draw Tool", () => {
  test("creates a canvas element", async ({ page }) => {
    await page.goto("/");

    const canvas = page.locator("canvas");
    await expect(canvas).toBeVisible();

    const box = await canvas.boundingBox();
    expect(box?.width).toBe(600);
    expect(box?.height).toBe(600);

    // snapshot of empty canvas
    expect(await canvas.screenshot()).toMatchSnapshot("empty-canvas.png");
  });

  test("draws a line when dragging mouse", async ({ page }) => {
    await page.goto("/");

    const canvas = page.locator("canvas");
    const box = await canvas.boundingBox();
    if (!box) throw new Error("Canvas not found");

    // simulate drag with mouse
    await page.mouse.move(box.x + 50, box.y + 50);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();

    // snapshot after line is drawn
    expect(await canvas.screenshot()).toMatchSnapshot("line.png");
  });

  test("switches to ellipse tool on 'e' key", async ({ page }) => {
    await page.goto("/");

    const canvas = page.locator("canvas");
    const box = await canvas.boundingBox();
    if (!box) throw new Error("Canvas not found");

    await page.keyboard.press("e");

    await page.mouse.move(box.x + 100, box.y + 100);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();

    // snapshot after ellipse
    expect(await canvas.screenshot()).toMatchSnapshot("ellipse.png");
  });

  test("increases stroke size on RIGHT_ARROW", async ({ page }) => {
    await page.goto("/");

    const canvas = page.locator("canvas");
    const box = await canvas.boundingBox();
    if (!box) throw new Error("Canvas not found");

    await page.keyboard.press("ArrowRight");

    await page.mouse.move(box.x + 150, box.y + 150);
    await page.mouse.down();
    await page.mouse.move(box.x + 200, box.y + 200);
    await page.mouse.up();

    // snapshot after stroke increase
    expect(await canvas.screenshot()).toMatchSnapshot("thick-stroke.png");
  });
});