import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client-service';
import { Pokemon } from 'src/libs/pokemon.interface';
import { lastValueFrom } from 'rxjs';
import { PokemonStats } from 'src/libs/pokemon-stats.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonMapperService {
  getUrl: string;
  speciesUrl: string;
  queryParams: string;
  chosenPokemon: Pokemon;

  constructor(private httpService: HttpClientService) {
    this.getUrl = 'https://pokeapi.co/api/v2/pokemon';
    this.speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';
    this.queryParams = 'offset=0&limit=1281';
    this.chosenPokemon = { name: ''};
  }

  async getPokemonById(pokemonId: string): Promise<Pokemon> {
    const pokemonData = await lastValueFrom(this.httpService.httpGet(this.getUrl + '/' + pokemonId.toLowerCase()));
    await this.mapPokemonData(pokemonData);
    return this.chosenPokemon;
  }

  async getPokemonList(): Promise<string[]> {
    let pokemonList : string[] = [];
    await lastValueFrom(this.httpService.httpGet(this.getUrl, this.queryParams))
    .then(res => pokemonList = this.getPokemonNames(res));
    return pokemonList;
  }

  private async mapPokemonData(pokemonData: any) {
    this.chosenPokemon = {
      dexNumber: pokemonData.id,
      name: pokemonData.name,
      stats: this.getPokemonStats(pokemonData),
      type: pokemonData.types.map((r: any) => r.type.name),
      spriteUrl: pokemonData.sprites.other['official-artwork'].front_default,
     // preEvolution: this.getPokemonEvolution(true),
     // evolution: this.getPokemonEvolution(false),
    }
    this.chosenPokemon.description = await this.getPokemonDescription(pokemonData);
    return this.chosenPokemon;
  }

  private async getPokemonDescription(pokemonData: any): Promise<string> {
    const pokemonSpeciesData = await lastValueFrom(this.httpService.httpGet(this.speciesUrl + '/' + pokemonData.name))
    const pokemonDescriptions = pokemonSpeciesData.flavor_text_entries.filter((r: any) => r.language.name === 'es');
    const randomDescriptionId = Math.floor(Math.random() * pokemonDescriptions.length);
    return pokemonDescriptions[randomDescriptionId].flavor_text;
  }

  private getPokemonEvolution(preEvolution: boolean): Pokemon {
    throw new Error('Method not implemented.');
  }

  private getPokemonStats(pokemonData: any): PokemonStats {
    return {
      hp: pokemonData.stats.find((r: any) => r.stat.name === 'hp').base_stat,
      attack: pokemonData.stats.find((r: any) => r.stat.name === 'attack').base_stat,
      spAttack: pokemonData.stats.find((r: any) => r.stat.name === 'special-attack').base_stat,
      defense: pokemonData.stats.find((r: any) => r.stat.name === 'defense').base_stat,
      spDefense: pokemonData.stats.find((r: any) => r.stat.name === 'special-defense').base_stat,
      speed: pokemonData.stats.find((r: any) => r.stat.name === 'speed').base_stat,
    }
  }

  private getPokemonNames(res: any) : string[] {
    const pokemonList: string[] = [];
    res.results.forEach((pokemon: Pokemon) =>
      pokemonList.push(pokemon.name)
    );
    return pokemonList;
  }
}
