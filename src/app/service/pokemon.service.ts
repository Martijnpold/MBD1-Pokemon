import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Pokemon } from '../model/pokemon'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  pokemonLimit = 5;
  data: Pokemon[] = [];

  constructor(private http: HttpClient) { }

  loadAll() {
    return from(new Promise((resolve, reject) => {
      //filestorage load

      //http load
      this.http.get<any>(this.pokemonUrl + "?limit=" + this.pokemonLimit).subscribe((pokemons) => {
        let pokemonCount = pokemons.results.length;
        pokemons.results.forEach(element => {
          this.loadSpecific(element.name).subscribe((pokemon) => {
            this.data.push(pokemon);
            if (this.data.length >= pokemonCount) {
              resolve(this.data)
            }
          })
        });
      })
    }));
  }

  loadSpecific(id: string) {
    if (this.data[id]) {
      return of(this.data[id]);
    }

    return this.http.get<Pokemon>(this.pokemonUrl + "/" + id)
  }

  getPokemons() {
    return this.loadAll();
  }
}
