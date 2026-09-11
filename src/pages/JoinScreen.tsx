import './JoinScreen.css'
import PlayerList from '../components/PlayerList'
import JoinForm from '../components/JoinForm'
import type { Player } from '../types/Player';
import { API_URL } from '../constants/api';

interface JoinScreenProps {
    gameId: string | null;
    players: Player[];
    me: Player | null;
    onJoined: (player: Player) => void;
}

function JoinScreen({ gameId, players, me, onJoined }: JoinScreenProps) {

    function handleJoin(username: string) {
        if (!gameId) return;

        fetch(`${API_URL}/games/${gameId}/players?playerName=${username}`, { method: "POST" })
            .then((response) => response.json())
            .then((player: Player) => onJoined(player))
    }

    return (
        <div className="container join">

            <h1>Calm Painter</h1>

            <div className="userInput">
                {me === null ? (
                    <JoinForm onJoin={handleJoin} />
                ) : (
                    <p>Welcome, {me.name}! Waiting for players...</p>
                )}
            </div>

            <div className="players">
                <label>Players: {players.length}/4</label>
                <div className="playerList">
                    <PlayerList players={players} />
                </div>
            </div>

        </div>
    )
}

export default JoinScreen
