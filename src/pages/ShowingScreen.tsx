import './ShowingScreen.css'
import { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import '../components/Timer.css'
import type { Player } from '../types/Player';
import PlayerList from '../components/PlayerList';
import GameGrid from '../components/GameGrid';
import type { Grid } from '../types/Grid';

// Test
const testPlayers: Player[] = [
    { id: "1", name: "Dali", color: "RED" },
    { id: "2", name: "van Gogh", color: "BLUE" },
    { id: "3", name: "Monet", color: "GREEN" },
    { id: "4", name: "Picasso", color: "YELLOW" },
];

const HEART_PATTERN = [
    "....X.....X....",
    "...XX.....XX...",
    "..XXXX...XXXX..",
    ".XXXXXX.XXXXXX.",
    "XXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXX",
    "XXXXXXXXXXXXXXX",
    ".XXXXXXXXXXXXX.",
    ".XXXXXXXXXXXXX.",
    "..XXXXXXXXXXX..",
    "...XXXXXXXXX...",
    "....XXXXXXX....",
    ".....XXXXX.....",
    "......XXX......",
    ".......X.......",
];

// Test
const testTargetGrid: Grid = {
    cells: HEART_PATTERN.map(row =>
        row.split("").map(char => (char === "X" ? "RED" : null))
    ),
};

function ShowingScreen() {

    const [secondsLeft, setSecondsLeft] = useState(10);

    useEffect(() => {
        if (secondsLeft === 0) return;

        const timeout = setTimeout(() => {
            setSecondsLeft(secondsLeft - 1);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [secondsLeft]);

    return (
        <div className="container show">
            <div className="showTimer">
                <Timer secondsLeft={secondsLeft} />
            </div>

            <div className="pictureToDraw">
                <h1>Picture to Draw</h1>
                <div className="pictureGrid">
                    <GameGrid grid={testTargetGrid} />
                </div>
            </div>
            <div className="playerBar">
                <PlayerList players={testPlayers} />
            </div>
        </div>
    )
}

export default ShowingScreen
