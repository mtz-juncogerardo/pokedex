import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { nameOfVar } from 'src/app/core/name-of-variable.function';
import { onChangesMapper } from 'src/app/core/on-changes-mapper.class';
import { PokemonMapperService } from 'src/app/services/pokemon-mapper-service';
import { Pokemon } from 'src/libs/pokemon.interface';

@Component({
  selector: 'pokemon-info-display',
  templateUrl: './pokemon-info-display.component.html',
  styleUrls: ['./pokemon-info-display.component.scss']
})
export class PokemonInfoDisplayComponent implements OnChanges {

  @Input()selectedPokemonId: string;
  selectedPokemon: Pokemon;
  loading: boolean;

  constructor(private readonly pokemonService: PokemonMapperService) {
    this.selectedPokemonId = '';
    this.selectedPokemon = {name: ''}
    this.loading = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    const myChanges = new onChangesMapper(changes, "selectedPokemonId");
    if (myChanges.expectedChange) {
      this.loading = true;
      this.setPokemonInfo(myChanges.value);
    }
  }

  private async setPokemonInfo(pokemonId: string) {
    this.selectedPokemon = await this.pokemonService.getPokemonById(pokemonId);
    setTimeout(() => this.loading = false, 500);
  }

  getStats(pokemonStats: any) {
    return Object.entries(pokemonStats);
  }
}
