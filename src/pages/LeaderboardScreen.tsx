import { useEffect, useState } from "react";
import type { Result } from "../types/Result";
import { API_URL } from "../constants/api";
import "./LeaderboardScreen.css";
import type { Game } from "../types/Game";
import GameGrid from "../components/GameGrid";
import PlayerList from "../components/PlayerList";

interface LeaderboardScreenProps {
    onBack: () => void;
    game: Game;
    result: Result;
}

function LeaderboardScreen({ game, result, onBack }: LeaderboardScreenProps) {
    const [results, setResults] = useState<Result[]>([]);

    // Load the results once when the screen opens.
    useEffect(() => {
        fetch(`${API_URL}/games/leaderboard`)
            .then((response) => response.json())
            .then((data: Result[]) => setResults(data));
    }, []);

    return (
        <div className="container leaderboard">
            <h1>Leader Board</h1>
            <div className="paintingHeader">
                <label>Target Painting</label>
                <label>Drawing</label>
            </div>

            <ol className="resultList">
                {results.map((result) => (
                    <li key={result.id}>
                        <div className="scoreboardPictures">
                            <GameGrid grid={game.targetPainting.grid}></GameGrid>
                            <GameGrid grid={result.picture}></GameGrid>
                        </div>
                        <div className="scoreContainer">
                            <span className="score">{Math.round(result.score)}%</span>
                            <span className="time">{result.time} s</span>
                        </div>
                        <div className="leaderboardPlayers">
                            <PlayerList players={result.players} />
                        </div>
                    </li>
                ))}
            </ol>

            <button className="backBtn" onClick={onBack}>Back</button>
        </div>
    )
}

export default LeaderboardScreen;