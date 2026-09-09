import GameGrid from '../components/GameGrid';
import PlayerList from '../components/PlayerList';
import Timer from '../components/Timer'
import type { Player } from '../types/Player';
import './DrawingScreen.css'
import { useState, useEffect } from 'react';
import type { Grid } from '../types/Grid';
import { GRID_SIZE } from '../constants/game';
import type { Color } from '../types/Color';

// Test
const testPlayers: Player[] = [
    { id: "1", name: "Dali", color: "RED" },
    { id: "2", name: "van Gogh", color: "BLUE" },
    { id: "3", name: "Monet", color: "GREEN" },
    { id: "4", name: "Picasso", color: "YELLOW" },
];

// Test
const currentPlayerColor: Color = "RED";

function DrawingScreen() {

    const [secondsLeft, setSecondsLeft] = useState(60);
    // Creates an object that contains a 2-dimensional array where all the elements in the nested arrays are null
    const [grid, setGrid] = useState<Grid>({
        cells: Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
    })

    /* Creates an object that contains a new updated 2-dimensional array with the user color in the cell that the user
    clicked and updates grid with the setGrid method to give it a new state value. */
    function handleCellClick(row: number, col: number) {
        setGrid(prevGrid => {
            const newCells = prevGrid.cells.map((rowCells, r) => {
                if (r !== row) {
                    return rowCells;
                }
                return rowCells.map((cell, i) => {
                    if (i === col) {
                        return currentPlayerColor
                    } else {
                        return cell
                    }
                })
            })
            return { cells: newCells };
        });
    }

    useEffect(() => {
        if (secondsLeft === 0) return;
        const timeout = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1)
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsLeft])

    return (
        <div className="container draw">
            <div className="drawTimer">
                <Timer secondsLeft={secondsLeft} />
            </div>
            <div className="drawing">
                <h1>DRAW!!!</h1>
                <div className="drawGrid">
                    <GameGrid onCellClick={handleCellClick} grid={grid} />
                </div>
                <button className="doneBtn">DONE !</button>
            </div>
            <div className="playerBar">
                <PlayerList players={testPlayers} />
            </div>
        </div>
    )
}

export default DrawingScreen