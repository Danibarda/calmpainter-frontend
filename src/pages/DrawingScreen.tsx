import GameGrid from '../components/GameGrid';
import PlayerList from '../components/PlayerList';
import Timer from '../components/Timer'
import type { Player } from '../types/Player';
import './DrawingScreen.css'
import { useState, useEffect } from 'react';
import type { Grid } from '../types/Grid';
import { GRID_SIZE } from '../constants/game';


interface DrawingScreenProps {
    me: Player | null;
    players: Player[];
}



function DrawingScreen({ me, players }: DrawingScreenProps) {

    const [secondsLeft, setSecondsLeft] = useState(60);
    // Creates an object that contains a 2-dimensional array where all the elements in the nested arrays are null
    const [grid, setGrid] = useState<Grid>({
        cells: Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null))
    })

    /* Creates an object that contains a new updated 2-dimensional array with the user color in the cell that the user
    clicked and updates grid with the setGrid method to give it a new state value. */
    function handleCellClick(row: number, col: number) {
        if (me != null) {
            setGrid(prevGrid => {
                const newCells = prevGrid.cells.map((rowCells, r) => {
                    if (r !== row) {
                        return rowCells;
                    }
                    return rowCells.map((cell, i) => {
                        if (i === col) {
                            return me.color
                        } else {
                            return cell
                        }
                    })
                })
                return { cells: newCells };
            });
        }
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
                <PlayerList players={players} />
            </div>
        </div>
    )
}

export default DrawingScreen