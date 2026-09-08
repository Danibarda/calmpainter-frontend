import type { Color } from "../types/Color";
import {COLOR_MAP } from "../constants/game";

interface CellProps {
    color: Color | null;
    row: number;
    col: number;
    onClick?: (row: number, col: number) => void;
}

// One square of the grid. It only show its color and report clicks.
function Cell({ color, row, col, onClick }: CellProps) {
    // Empty cell (null) is show in gray
    const backgroundColor = color ? COLOR_MAP[color] : "lightgray";

    return (
        <button
            className="cell"
            style={{ backgroundColor }}
            onClick={onClick ? () => onClick(row, col) : undefined}
            disabled={!onClick}
            />
    );
}

export default Cell;
