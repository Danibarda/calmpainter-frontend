export const GAME_STATES = ["WAITING", "PICTUREVIEW", "PLAYING", "FINISHED"] as const;

export type GameState = typeof GAME_STATES[number];
