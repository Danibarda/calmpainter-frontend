import GameGrid from "../components/GameGrid"
import type { Game } from "../types/Game"
import type { Result } from "../types/Result";
import './ScoreScreen.css';

interface ScoreScreenProps {
    game: Game;
    result: Result;
}

function ScoreScreen({ game, result }: ScoreScreenProps) {
    return (
        <div className="container score">
            <div className="paintingsContainer">
                <div className="targetPainting">
                    <label>Original</label>
                    <div>
                        <GameGrid grid={game.targetPainting.grid} />
                    </div>
                </div>
                <div className="yourPainting">
                    <label>Your Drawing</label>
                    <div>
                        <GameGrid grid={result.picture} />
                    </div>
                </div>
            </div>
            <div className="showScore">
                <label>Score: {Math.round(result.score)}% <span className="scoreEmoji">{result.score < 50 ? "💩" : "⭐"}</span></label>
                <label>Time: {result.time} seconds <span className="timeEmoji">⏰</span></label>
            </div>
            <div className="btnContainer">
                <button className="playBtn">Play Again</button>
                <button className="leaderBtn">Leader Board</button>
            </div>
        </div>
    )
}

export default ScoreScreen