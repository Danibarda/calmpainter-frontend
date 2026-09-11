import GameGrid from '../components/GameGrid';
import PlayerList from '../components/PlayerList';
import Timer from '../components/Timer'
import type { Player } from '../types/Player';
import './DrawingScreen.css'
import { useState, useEffect } from 'react';
import type { Game } from '../types/Game';
import { API_URL } from '../constants/api';

interface DrawingScreenProps {
    game: Game;
    me: Player;
}

function DrawingScreen({ me, game }: DrawingScreenProps) {

    const [secondsLeft, setSecondsLeft] = useState(60);

    function handleCellClick(row: number, col: number) {
        fetch(`${API_URL}/games/${game.id}/paint?playerId=${me.id}&row=${row}&column=${col}`, {
            method: "POST"
        })
    }

    // Ends the game for everyone.
    function handleDone() {
        fetch(`${API_URL}/games/${game.id}/done`, { method: "POST" })
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
                    <GameGrid onCellClick={handleCellClick} grid={game.grid} />
                </div>
                <button className="doneBtn" onClick={handleDone}>DONE !</button>
            </div>
            <div className="playerBar">
                <PlayerList players={game.players} />
            </div>
        </div>
    )
}

export default DrawingScreen