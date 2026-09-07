import PlayerList from '../components/PlayerList';
import Timer from '../components/Timer'
import type { Player } from '../types/Player';
import './DrawingScreen.css'
import { useState, useEffect } from 'react';

// Test
const testPlayers: Player[] = [
    { id: "1", name: "Dali", color: "RED" },
    { id: "2", name: "van Gogh", color: "BLUE" },
    { id: "3", name: "Monet", color: "GREEN" },
    { id: "4", name: "Picasso", color: "YELLOW" },
];

function DrawingScreen() {

    const [secondsLeft, setSecondsLeft] = useState(60);

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

                </div>
                <button>DONE !</button>
            </div>
            <div className="playerBar">
                <PlayerList players={testPlayers} />
            </div>
        </div>
    )
}

export default DrawingScreen