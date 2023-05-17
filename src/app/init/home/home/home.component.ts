import { Component, OnInit } from '@angular/core';
import { PokemonMapperService } from 'src/app/services/pokemon-mapper-service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  selectedPokemon: string;

  constructor() {
    this.selectedPokemon = '';
  }

  ngOnInit(): void {
  }

  onPokemonSelected(pokemonName: string) {
    this.selectedPokemon = pokemonName;
  }
}
