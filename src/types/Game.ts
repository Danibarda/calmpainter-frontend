import type { GameState } from "./GameState";
import type { Grid } from "./Grid";
import type { Player } from "./Player";
import type { TargetPainting } from "./TargetPainting";

export interface Game {
    id: string;
    players: Player[];
    state: GameState;
    grid: Grid;
    targetPainting: TargetPainting;
}