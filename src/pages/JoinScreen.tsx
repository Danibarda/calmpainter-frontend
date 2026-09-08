import './JoinScreen.css'
import PlayerList from '../components/PlayerList'
import type { Player } from '../types/Player';
import JoinForm from '../components/JoinForm'
import { useState } from 'react';
import { COLORS } from '../types/Color';


// Test
const testPlayers: Player[] = [
    { id: "1", name: "Dali", color: "RED" },
    { id: "2", name: "van Gogh", color: "BLUE" },
    { id: "3", name: "Monet", color: "GREEN" },
    { id: "4", name: "Picasso", color: "YELLOW" },
];


function JoinScreen() {

    const [players, setPlayers] = useState<Player[]>([]);

    function handleJoin(username: string) {
        if(players.length >= 4) {
            alert("Lobby is full!")
            return
        }

        if (username.trim() === "") {
            alert("Please enter a username!")
            return
        }
        const newPlayer: Player = {
            id: String(players.length + 1),
            name: username,
            color: COLORS [players.length]
        }
        
        console.log("Player joined: ", username);
        setPlayers([...players, newPlayer]);
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