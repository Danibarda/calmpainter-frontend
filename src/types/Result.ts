import type { Grid } from "./Grid";
import type { Player } from "./Player";

export interface Result {
    id: string;
    picture: Grid;
    score: number;
    time: number;
    players: Player[];
}