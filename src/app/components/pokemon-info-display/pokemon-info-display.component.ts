import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  constructor(private readonly pokemonService: PokemonMapperService) {
    this.selectedPokemonId = '';
    this.selectedPokemon = {name: ''}
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedPokemonId'].currentValue !== changes['selectedPokemonId'].previousValue){
      this.setPokemonInfo(changes['selectedPokemonId'].currentValue);
    }
  }

  private async setPokemonInfo(pokemonId: string) {
    this.selectedPokemon = await this.pokemonService.getPokemonById(pokemonId);
  }
}
