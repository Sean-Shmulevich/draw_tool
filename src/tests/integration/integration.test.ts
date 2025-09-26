// tests/sketch.integration.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { sketch } from "../../sketch";

// Mock type includes handlers that sketch will add
interface MockP5 {
    createCanvas: ReturnType<typeof vi.fn>;
    background: ReturnType<typeof vi.fn>;
    strokeWeight: ReturnType<typeof vi.fn>;
    stroke: ReturnType<typeof vi.fn>;
    line: ReturnType<typeof vi.fn>;
    ellipse: ReturnType<typeof vi.fn>;
    key: string;
    mouseIsPressed: boolean;
    mouseX: number;
    mouseY: number;
    pmouseX: number;
    pmouseY: number;
    P2D: string;
    setup?: () => void;
    draw?: () => void;
    keyTyped?: () => void;
    keyPressed?: () => void;
}

// Pure p5 mock
function createMockP5(): MockP5 {
    return {
        createCanvas: vi.fn(),
        background: vi.fn(),
        strokeWeight: vi.fn(),
        stroke: vi.fn(),
        line: vi.fn(),
        ellipse: vi.fn(),
        key: "",
        mouseIsPressed: false,
        mouseX: 0,
        mouseY: 0,
        pmouseX: 0,
        pmouseY: 0,
        P2D: "P2D"
    };
}

describe("sketch integration (pure mock)", () => {
    let s: MockP5;

    beforeEach(() => {
        s = createMockP5();
        sketch(s as any); // sketch binds lifecycle functions onto s
    });

    it("initializes canvas with size and background", () => {
        s.setup?.();
        expect(s.createCanvas).toHaveBeenCalledWith(600, 600, "P2D");
        expect(s.background).toHaveBeenCalledWith(255);
        expect(s.strokeWeight).toHaveBeenCalledWith(1);
    });

    it("draws a line when mouse is pressed in state 0", () => {
        s.mouseIsPressed = true;
        s.mouseX = 10;
        s.mouseY = 20;
        s.pmouseX = 5;
        s.pmouseY = 15;

        s.draw?.();
        expect(s.line).toHaveBeenCalledWith(10, 20, 5, 15);
    });

    it("switches tool with keyTyped and uses ellipse for state 1", () => {
        s.key = "e";
        s.keyTyped?.();

        s.mouseIsPressed = true;
        s.mouseX = 50;
        s.mouseY = 60;

        s.draw?.();
        expect(s.ellipse).toHaveBeenCalledWith(50, 60, 10, 10);
    });

    it("increases stroke size with ArrowRight keyPressed", () => {
        s.key = "ArrowRight";
        s.keyPressed?.();

        expect(s.strokeWeight).toHaveBeenCalledWith(2);
    });
});