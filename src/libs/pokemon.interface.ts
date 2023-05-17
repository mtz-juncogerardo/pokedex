import { PokemonStats } from "./pokemon-stats.interface";
import { PokemonType } from "./pokemon-type.enum";

export interface Pokemon {
    dexNumber?: number;
    name: string;
    stats?: PokemonStats;
    type?: PokemonType[];
    description?: string;
    spriteUrl?: string;
    preEvolution?: Pokemon;
    evolution?: Pokemon;
}