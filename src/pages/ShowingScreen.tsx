import './ShowingScreen.css'
import { useState, useEffect } from 'react';
import Timer from '../components/Timer';
import '../components/Timer.css'
import PlayerList from '../components/PlayerList';
import GameGrid from '../components/GameGrid';
import type { Game } from '../types/Game';

interface ShowingScreenProps {
    game: Game
}

function ShowingScreen( {game}: ShowingScreenProps)  {

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
                    <GameGrid grid={game.targetPainting.grid} />
                </div>
            </div>
            <div className="playerBar">
                <PlayerList players={game.players} />
            </div>
        </div>
    )
}

export default ShowingScreen
