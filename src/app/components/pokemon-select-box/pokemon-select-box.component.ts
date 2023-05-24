import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { nameOfVar } from 'src/app/core/name-of-variable.function';
import { onChangesMapper } from 'src/app/core/on-changes-mapper.class';
import { PokemonMapperService } from 'src/app/services/pokemon-mapper-service';

@Component({
  selector: 'pokemon-select-box',
  templateUrl: './pokemon-select-box.component.html',
  styleUrls: ['./pokemon-select-box.component.scss'],
})
export class PokemonSelectBoxComponent implements OnInit, OnChanges {

  @Output() onOptionSelected = new EventEmitter<string>();
  @Input() resetToDefault: boolean;

  pokemonNameList: string[];
  pokeOption: string;

  constructor(private readonly pokemonService: PokemonMapperService) {
    this.pokeOption = 'bulbasaur';
    this.pokemonNameList = [];
    this.resetToDefault = false;
  }

  ngOnChanges (changes: SimpleChanges){
    const myChanges = new onChangesMapper(changes, nameOfVar(this.resetToDefault));
    if (myChanges.expectedChange) {
      this.resetToDefault = myChanges.value;
    }
    if (this.resetToDefault) {
      this.pokeOption = ''
      this.onOptionSelected.emit('');
    }
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
