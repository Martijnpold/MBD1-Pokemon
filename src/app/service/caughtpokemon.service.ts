import { Injectable } from '@angular/core';
import { PokemonService } from './pokemon.service';
import { Pokemon } from '../model/pokemon';
import { of, from } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CaughtpokemonService {
  private caughtIds: number[] = [];

  constructor(private storage: Storage, private pokemonService: PokemonService) {
    this.load();
  }

  reset() {
    this.caughtIds = [];
    this.save();
  }

  addCaught(pokemon: Pokemon) {
    this.caughtIds.push(pokemon.id);
    this.save();
  }

  getCaught() {
    return from(new Promise<Pokemon[]>((resolve, reject) => {
      this.load().subscribe(() => {
        let pokemons = [];
        let total = this.caughtIds.length;
        let done = 0;
        this.caughtIds.forEach((e) => {
          this.pokemonService.getPokemons(e, 1).subscribe((p) => {
            if (p.length > 0) {
              pokemons.push(p[0]);
            }
            done++;
            if (total == done) resolve(pokemons);
          })
        })
        if (total == done) resolve(pokemons);
      })
    }));
  }

  private load() {
    return from(new Promise<Pokemon[]>((resolve, reject) => {
      this.storage.get('kennel').then((caught) => {
        this.caughtIds = [];
        if (caught) {
          caught.split(',').forEach(c => {
            this.caughtIds.push(Number.parseInt(c))
          });
        }
        resolve();
      });
    }));
  }

  private save() {
    this.storage.set('kennel', this.caughtIds.join(','));
  }
}
