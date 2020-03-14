import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service'
import { Pokemon } from '../../model/pokemon'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.getPokemons();
  }

  getPokemons() {
    this.pokemonService.getPokemons()
      .subscribe((data: Pokemon[]) => {
        console.log(data)
        this.pokemons = data;
      });
  }
}
