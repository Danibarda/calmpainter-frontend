import type { Color } from "./Color";

export interface Grid {
    cells: (Color | null)[][]
}