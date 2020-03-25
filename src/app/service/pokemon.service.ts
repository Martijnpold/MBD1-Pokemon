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
  pokemonLimit = 50;
  data: Map<number, Pokemon> = new Map();

  constructor(private storage: Storage, private http: HttpClient) { }

  loadRange(start: number, amount: number): Observable<Pokemon[]> {
    return from(new Promise<Pokemon[]>((resolve, reject) => {
      let finished = 0;
      let next = start + amount;
      let loadedData: Pokemon[] = [];
      for (let id = start; id < start + amount; id++) {
        this.loadSpecific(id).subscribe((pokemon) => {
          if (pokemon != null) {
            if (!pokemon.deleted) {
              this.data.set(id, pokemon);
              loadedData.push(pokemon);
              finished++;
            } else {
              this.loadRange(next, 1).subscribe((pokemons) => {
                if (pokemons.length > 0 && !pokemons[0].deleted) {
                  this.data.set(pokemons[0].id, pokemons[0]);
                  loadedData.push(pokemons[0]);
                }
                finished++;
                if (finished == amount) {
                  resolve(loadedData);
                }
              });
              next++;
            }
          } else {
            finished++;
          }
          if (finished == amount) {
            resolve(loadedData);
          }
        }, (err) => {
          reject(err);
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
          let pokemon = Object.assign(new Pokemon, data);
          resolve(pokemon);
        } else {
          if (id < this.pokemonLimit) {
            this.http.get<Pokemon>(this.pokemonUrl + "/" + id).subscribe((data) => {
              let pokemon = Object.assign(new Pokemon, data);
              this.storage.set("pokemon" + id, pokemon)
              this.data.set(id, pokemon)
              resolve(pokemon)
            }, (err) => {
              reject(err);
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

  getAllPokemons(): Observable<Pokemon[]> {
    return from(new Promise<Pokemon[]>((resolve, reject) => {
      this.getAvailableId().subscribe((max) => {
        this.getPokemons(1, max - 1).subscribe((pokemons) => {
          resolve(pokemons);
        })
      });
    }));
  }

  updatePokemon(pokemon: Pokemon) {
    this.storage.set("pokemon" + pokemon.id, pokemon)
    this.data.set(pokemon.id, pokemon)
  }

  getAvailableId(): Observable<number> {
    return from(new Promise<number>((resolve, reject) => {
      this.storage.keys().then((keys) => {
        for (let i = this.pokemonLimit; i < 1000; i++) {
          if (!keys.includes("pokemon" + i)) {
            resolve(i);
            return;
          }
        }
      })
    }))
  }
}
