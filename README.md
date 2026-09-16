# Calmpainter

🎨 **Live demo:** [calmpainter-frontend-e3f6o.ondigitalocean.app](https://calmpainter-frontend-e3f6o.ondigitalocean.app/)

Calmpainter is a small multiplayer drawing game that welcomes players from all ages to encourage creativity. It is especially designed for kids developement using their imagination without the pressure of competitiveness. Players join a game, look at a
target painting, then try to recreate it on a pixel grid before time runs out.
Everyone's progress updates live, and at the end everyone gets scored and can check the leaderboard afterwards.

## How it works

1. **Join** – open the app, enter a name, and join the current game.
2. **View** – a target painting is shown for everyone to memorize.
3. **Paint** – recreate the painting on your own grid before the timer ends.
4. **Score** – see how close your painting was, then check the leaderboard.

The frontend talks to a backend over two channels:

- **REST** – to fetch the current game (`GET /games/current`).
- **WebSocket (STOMP over SockJS)** – to receive live updates as the game and
  results change.

## Tech stack

- React 19 + TypeScript
- Vite
- `@stomp/stompjs` + `sockjs-client` for real-time updates

## Getting started locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set the backend URL. Copy `.env.example` to `.env` and point it at your
   backend:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_API_URL=http://localhost:8080
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

The app will be available at the URL Vite prints in the terminal (usually
`http://localhost:5173`). Make sure the backend is running at the URL set in
`VITE_API_URL`.
