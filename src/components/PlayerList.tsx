import type { Player } from "../types/Player";
import './PlayerList.css';

interface PlayerListProps {
    players: Player[];
}

function PlayerList({ players }: PlayerListProps) {
    return (

        <ul>
            {players.map((player) => 
            <li key={player.id}> 
            <span className={"dot " + player.color.toLowerCase()}></span>
                {player.name}
            </li>
            )}
        </ul>
    )
} 

export default PlayerList;
