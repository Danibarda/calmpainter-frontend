import { useEffect, useState } from "react";
import type { Result } from "../types/Result";
import { API_URL } from "../constants/api";
import "./LeaderboardScreen.css";
import type { Game } from "../types/Game";
import GameGrid from "../components/GameGrid";

interface LeaderboardScreenProps {
    onBack: () => void;
    game: Game;
    result: Result;
}

function LeaderboardScreen({game, result, onBack }: LeaderboardScreenProps) {
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

            <ol className="resultList">
                {results.map((result) => (
                    <li key={result.id}>
                        <GameGrid grid={game.targetPainting.grid}></GameGrid>
                        <GameGrid grid={result.picture}></GameGrid>
                        <span className="score">{Math.round(result.score)}%</span>
                        <span className="time">{result.time} s</span>
                    </li>
                ))}
            </ol>

            <button className="backBtn" onClick={onBack}>Back</button>
        </div>
    )
}

export default LeaderboardScreen;