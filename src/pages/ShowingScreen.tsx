import './ShowingScreen.css'
import { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import '../components/Timer.css'
import type { Player } from '../types/Player';
import PlayerList from '../components/PlayerList';

// Test
const testPlayers: Player[] = [
    { id: "1", name: "Dali", color: "RED" },
    { id: "2", name: "van Gogh", color: "BLUE" },
    { id: "3", name: "Monet", color: "GREEN" },
    { id: "4", name: "Picasso", color: "YELLOW" },
];


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

                </div>
            </div>
            <div className="playerBar">
                <PlayerList players={testPlayers} />
            </div>
        </div>
    )
}

export default ShowingScreen
