import { Component, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service'
import { Pokemon } from '../../model/pokemon'
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemons = [];
    this.loadData(null)
  }

  loadData(event) {
    this.pokemonService.getPokemons(this.pokemons.length + 1, 20).subscribe((loaded) => {
      this.pokemons.push(...loaded)
      console.log(this.pokemons)
      if (event) {
        event.target.complete();
        if (loaded.length == 0) {
          event.target.disabled = true;
        }
      }
    })
  }
}
