import { describe, it, expect } from "vitest";
import { handleKeyTyped, handleKeyPressed } from "../pen";

describe("pen logic", () => {
  it("changes pen state on key typed", () => {
    let config = { size: 1, state: 0 };

    config = handleKeyTyped("e", config);
    expect(config.state).toBe(1);

    config = handleKeyTyped("x", config);
    expect(config.state).toBe(2);

    config = handleKeyTyped("l", config);
    expect(config.state).toBe(0);
  });

  it("increases/decreases pen size on arrow keys", () => {
    const LEFT = "ArrowLeft", RIGHT = "ArrowRight"; // standard codes
    let config = { size: 5, state: 0 };

    config = handleKeyPressed(LEFT, config);
    expect(config.size).toBe(4);

    config = handleKeyPressed(RIGHT, config);
    expect(config.size).toBe(5);
  });
});
