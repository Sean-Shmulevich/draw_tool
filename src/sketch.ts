import type p5 from "p5";
import { type PenConfig, handleKeyTyped, handleKeyPressed } from "./pen";

// export sketch separately
export const sketch = (s: p5) => {
    let config: PenConfig = { size: 1, state: 0 };

    s.setup = () => {
        s.createCanvas(600, 600, s.P2D);
        s.background(255);
        s.strokeWeight(config.size);
    };

    s.draw = () => {
        if (s.mouseIsPressed) {
            if (config.state === 0) {
                s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
            }
            if (config.state === 1) {
                s.ellipse(s.mouseX, s.mouseY, 10, 10);
            }
            if (config.state === 2) {
                s.line(s.mouseX - 5, s.mouseY - 5, s.mouseX + 5, s.mouseY + 5);
                s.line(s.mouseX + 5, s.mouseY - 5, s.mouseX - 5, s.mouseY + 5);
            }
        }
    };

    s.keyTyped = () => {
        config = handleKeyTyped(s.key, config);

        if (s.key === "c") s.background(255);
        if (s.key === "r") s.stroke(255, 0, 0);
        if (s.key === "b") s.stroke(0, 0, 255);
    };

    s.keyPressed = () => {
        switch (s.key) {
            case "ArrowLeft":
            case "ArrowRight":
                config = handleKeyPressed(s.key as "ArrowLeft" | "ArrowRight", config);
                s.strokeWeight(config.size);
                break;
            default:
                break;
        }
    };
};