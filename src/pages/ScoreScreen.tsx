import GameGrid from "../components/GameGrid"
import type { Game } from "../types/Game"
import type { Result } from "../types/Result";
import './ScoreScreen.css';

interface ScoreScreenProps {
    game: Game;
    result: Result;
    onPlayAgain: () => void;
    onShowLeaderboard: () => void;
}

function ScoreScreen({ game, result, onPlayAgain, onShowLeaderboard }: ScoreScreenProps) {
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
                <button className="playBtn" onClick={onPlayAgain}>Play Again</button>
                <button className="leaderBtn" onClick={onShowLeaderboard}>Leader Board</button>
            </div>
        </div>
    )
}

export default ScoreScreen