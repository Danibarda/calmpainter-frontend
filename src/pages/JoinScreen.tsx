import './JoinScreen.css'
import PlayerList from '../components/PlayerList'
import type { Player } from '../types/Player';
import JoinForm from '../components/JoinForm'
import { useEffect, useState } from 'react';
import type { Game } from '../types/Game';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function JoinScreen() {

    const [players, setPlayers] = useState<Player[]>([]);
    const [gameId, setGameId] = useState<string | null>(null);
    
    useEffect(() => {
        fetch("http://localhost:8080/games/current")
        .then(response => response.json())
        .then((game: Game) => setGameId(game.id));
    }, [])
    
    useEffect(() => {
        if (!gameId) return;
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
            onConnect: () => {
                client.subscribe(`/topic/games/${gameId}`, (message) => {
                    const game: Game = JSON.parse(message.body);
                    setPlayers(game.players);
                })
            }
        });

        client.activate();
    
        return () => {
            client.deactivate();
        }

    }, [gameId]);

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