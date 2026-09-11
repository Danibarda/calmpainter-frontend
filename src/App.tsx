import './App.css'
import JoinScreen from './pages/JoinScreen'
import ShowingScreen from './pages/ShowingScreen'
import DrawingScreen from './pages/DrawingScreen'
import { useEffect, useState } from 'react';
import type { Game } from './types/Game';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import type { Player } from './types/Player';

function App() {

  const [game, setGame] = useState<Game | null>(null);
  const [me, setMe] = useState<Player | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/games/current")
      .then(response => response.json())
      .then((game: Game) => setGame(game));
  }, []);

  /* Creates a STOMP client and configures it with a SockJS connection to our backend. */
  useEffect(() => {
    if (!game?.id) return;

    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
      onConnect: () => {
        client.subscribe(`/topic/games/${game.id}`, (message) => {
          const updatedGame: Game = JSON.parse(message.body);
          setGame(updatedGame);
        });
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [game?.id]);

  return (
    <div>
      {game?.state === "WAITING" && (
        <JoinScreen gameId={game?.id ?? null} players={game?.players ?? []} onJoined={setMe} />
      )}
      {game?.state === "PICTUREVIEW" &&  <ShowingScreen game={game} />}
      {game?.state === "PLAYING" && <DrawingScreen me={me} players={game?.players ?? []}/>}
    </div>
  )
}

export default App
