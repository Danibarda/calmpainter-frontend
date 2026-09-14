import './App.css'
import JoinScreen from './pages/JoinScreen'
import ShowingScreen from './pages/ShowingScreen'
import DrawingScreen from './pages/DrawingScreen'
import { useEffect, useState } from 'react';
import type { Game } from './types/Game';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { Player } from './types/Player';
import ScoreScreen from './pages/ScoreScreen';
import type { Result } from './types/Result';
import { API_URL } from './constants/api';
import LeaderboardScreen from './pages/LeaderboardScreen';

// Key used to remember this browser's player
const STORAGE_KEY = "calmpainter.me";

// returns the saved player if this browser already joined this game, otherwise null
function restoreMe(gameId: string): Player | null {
  const saved = localStorage.getItem(STORAGE_KEY);
  if(!saved) return null;

  const data = JSON.parse(saved);
  return data.gameId === gameId ? data.player : null;
}

function App() {

  const [game, setGame] = useState<Game | null>(null);
  const [me, setMe] = useState<Player | null>(null);
  const [result, setResult] = useState<Result |null>(null);
  const [showLeaderboard, setShowLeaderboard] = useState(true);

  // Load the open game and restores the players
  function loadCurrentGame() {
    fetch(`${API_URL}/games/current`)
      .then(response => response.json())
      .then((game: Game) => {
        setGame(game);
        setMe(restoreMe(game.id));
      });
  }

  useEffect(() => {
    loadCurrentGame();
  }, []);

  /* Creates a STOMP client and configures it with a SockJS connection to our backend. */
  useEffect(() => {
    if (!game?.id) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(`${API_URL}/websocket`),
      onConnect: () => {
        client.subscribe(`/topic/games/${game.id}`, (message) => {
          const updatedGame: Game = JSON.parse(message.body);
          setGame(updatedGame);
        });

        client.subscribe(`/topic/games/${game.id}/result`, (message) => {
          const result: Result = JSON.parse(message.body);
          setResult(result);
        })
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [game?.id]);

  //save the player so other tabs of this browser can't join again
  function handleJoined(player: Player) {
    setMe(player);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ gameId: game?.id, player }));
  }

  //Back to the lobby after a finished game
  function handlePlayAgain() {
    setResult(null);
    loadCurrentGame();
    setShowLeaderboard(false);
  }

  return (
    <div>
      {showLeaderboard && (
        <LeaderboardScreen onBack={() => setShowLeaderboard(false)} />
      )}
      {!showLeaderboard && game?.state === "WAITING" && (
        <JoinScreen gameId={game?.id ?? null} players={game?.players ?? []} me={me} onJoined={handleJoined} />)}
      {!showLeaderboard && game?.state === "PICTUREVIEW" &&  <ShowingScreen game={game} />}
      {!showLeaderboard && game?.state === "PLAYING" && me && <DrawingScreen game={game} me={me} />}
      {!showLeaderboard && game?.state === "FINISHED" && result && (
        <ScoreScreen
          game={game}
          result={result}
          onPlayAgain={handlePlayAgain}
          onShowLeaderboard={() => setShowLeaderboard(true)}
        />
      )}
    </div>
  )
}

export default App
