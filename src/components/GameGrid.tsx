import type { Grid } from "../types/Grid";
import { GRID_SIZE } from "../constants/game";
import Cell from "./Cell";
import "./GameGrid.css";

interface GameGridProps {
    grid: Grid;
    onCellClick?: (row: number, col: number) => void;
}

// Renders the shared grid as a 15x15 grid of cells
// It never paints by itself, it only reports which cell was clicked
function GameGrid({ grid, onCellClick }: GameGridProps) {
    return (
        <div
            className="game-grid"
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            }}
        >
            {grid.cells.map((rowCells, row) =>
            rowCells.map((color, col) => (
                <Cell
                    key={`${row}-${col}`}
                    color={color}
                    row={row}
                    col={col}
                    onClick={onCellClick}
                />
            ))
        )}
        </div>
    );
}

export default GameGrid;
