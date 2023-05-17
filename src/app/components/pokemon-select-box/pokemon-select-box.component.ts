import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonMapperService } from 'src/app/services/pokemon-mapper-service';

@Component({
  selector: 'pokemon-select-box',
  templateUrl: './pokemon-select-box.component.html',
  styleUrls: ['./pokemon-select-box.component.scss'],
})
export class PokemonSelectBoxComponent implements OnInit {

  @Output() onOptionSelected = new EventEmitter<string>();

  pokemonNameList: string[];

  constructor(private readonly pokemonService: PokemonMapperService) {
    this.pokemonNameList = [];
  }

  ngOnInit(): void {
    this.setPokemonNames();
  }

  private async setPokemonNames() {
    this.pokemonNameList = await this.pokemonService.getPokemonList();
    this.valueChanges(this.pokemonNameList[0]);
  }

  valueChanges(pokemonName: string) {
    this.onOptionSelected.emit(pokemonName);
  }
}
