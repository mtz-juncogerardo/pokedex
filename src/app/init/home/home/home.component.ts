import { Component, OnInit } from '@angular/core';
import { PokemonMapperService } from 'src/app/services/pokemon-mapper-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedPokemon: string;
  activePokemon: boolean;
  dexNumber: number;

  constructor() {
    this.selectedPokemon = '';
    this.dexNumber = 0;
    this.activePokemon = false;
  }

  ngOnInit(): void {
  }

  pokemonSelected(pokemonName: string) {
    this.selectedPokemon = pokemonName;
    this.activePokemon = !!this.selectedPokemon
  }

  dexNumberEntered(dexNumber: number) {
    this.selectedPokemon = dexNumber.toString();
    this.dexNumber = dexNumber;
  }
}
