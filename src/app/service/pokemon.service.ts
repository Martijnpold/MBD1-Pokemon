import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { Pokemon } from '../model/pokemon'
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  pokemonUrl = "https://pokeapi.co/api/v2/pokemon";
  pokemonLimit = 100;
  data: Map<number, Pokemon> = new Map();

  constructor(private storage: Storage, private http: HttpClient) { }

  loadRange(start: number, amount: number): Observable<Pokemon[]> {
    return from(new Promise<Pokemon[]>((resolve, reject) => {
      let finished = 0;
      let loadedData: Pokemon[] = [];
      for (let id = start; id < start + amount; id++) {
        this.loadSpecific(id).subscribe((pokemon) => {
          if (pokemon != null) {
            this.data.set(id, pokemon);
            loadedData.push(pokemon);
          }
          finished++;
          if (finished == amount) {
            resolve(loadedData);
          }
        })
      }
    }));
  }

  loadSpecific(id: number): Observable<Pokemon> {
    //Load cache
    if (this.data.has(id)) {
      return of(this.data.get(id));
    }

    return from(new Promise<Pokemon>((resolve, reject) => {
      //Load filesystem
      this.storage.get("pokemon" + id).then((data) => {
        if (data) {
          resolve(data)
        } else {
          if (id < this.pokemonLimit) {
            this.http.get<Pokemon>(this.pokemonUrl + "/" + id).subscribe((pokemon) => {
              this.storage.set("pokemon" + id, pokemon)
              resolve(pokemon)
            })
          } else {
            resolve(undefined)
          }
        }
      })
    }))
  }

  getPokemons(start: number, amount: number): Observable<Pokemon[]> {
    return this.loadRange(start, amount);
  }
}
