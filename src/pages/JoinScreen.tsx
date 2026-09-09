import './JoinScreen.css'
import PlayerList from '../components/PlayerList'
import type { Player } from '../types/Player';
import JoinForm from '../components/JoinForm'
import { useEffect, useState } from 'react';
import type { Game } from '../types/Game';

function JoinScreen() {

    const [players, setPlayers] = useState<Player[]>([]);
    const [gameId, setGameId] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/games", { method: "POST" })
            .then(response => response.json())
            .then((game: Game) => setGameId(game.id));
    }, [])

    function handleJoin(username: string) {
        if (!gameId) return;

        fetch(`http://localhost:8080/games/${gameId}/players?playerName=${username}`, { method: "POST" })
            .then(response => response.json())
            .then((game: Game) => setPlayers(game.players))
        }

    return (
        <div className="container join">

            <h1>Calm Painter</h1>

            <div className="userInput">
                <JoinForm onJoin={handleJoin} />
                
            </div>

            <div className="players">
                <div className="playerList">
                    <label>Players: {players.length}/4</label>
                    <PlayerList players={players} />
                </div>
                <button>Start Game</button>
            </div>

        </div>
    )
}

export default JoinScreen