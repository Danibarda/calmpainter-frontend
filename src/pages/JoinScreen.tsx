import './JoinScreen.css'
import PlayerList from '../components/PlayerList'
import type { Player } from '../types/Player';
import JoinForm from '../components/JoinForm'


// Test
const testPlayers: Player[] = [
    { id: "1", name: "Dali", color: "RED" },
    { id: "2", name: "van Gogh", color: "BLUE" },
    { id: "3", name: "Monet", color: "GREEN" },
    { id: "4", name: "Picasso", color: "YELLOW" },
];


function JoinScreen() {

    function handleJoin(username: string) {
        console.log("Player joined: ", username);

    }


    return (
        <div className="container join">

            <h1>Calm Painter</h1>

            <div className="userInput">
                <JoinForm onJoin={handleJoin} />
            </div>

            <div className="players">
                <div className="playerList">
                    <label>Players: 4/4</label>
                    <PlayerList players={testPlayers} />
                </div>
                <button>Start Game</button>
            </div>

        </div>
    )
}

export default JoinScreen