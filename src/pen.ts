export type PenState = 0 | 1 | 2;

export interface PenConfig {
    size: number;
    state: PenState;
}

export function handleKeyTyped(key: string, config: PenConfig): PenConfig {
    if (key === "c") return { ...config }; // background is visual side effect
    if (key === "r" || key === "b") return { ...config }; // stroke change
    if (key === "x") return { ...config, state: 2 };
    if (key === "e") return { ...config, state: 1 };
    if (key === "l") return { ...config, state: 0 };
    return config;
}

export function handleKeyPressed(
    key: "ArrowLeft" | "ArrowRight",
    config: PenConfig,
): PenConfig {
    if (key === "ArrowLeft"  && config.size > 1) {
        console.log("left pressed");
        return { ...config, size: config.size - 1  };
    }
    if (key === "ArrowRight") {
        console.log("right pressed");
        return {  ...config, size: config.size + 1 };
    }
    return config;
}
