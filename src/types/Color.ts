export const COLORS = ["BLUE", "RED", "YELLOW", "GREEN"] as const;

export type Color = typeof COLORS[number];
