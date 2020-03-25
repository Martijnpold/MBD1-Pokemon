import { Injectable } from '@angular/core';
import { NearbyPokemon } from '../model/nearbypokemon';
import { Observable, from, of } from 'rxjs';
import { PokemonService } from './pokemon.service';

@Injectable({
  providedIn: 'root'
})
export class NearbypokemonService {
  private data: NearbyPokemon[] = [];
  private pokemonCount = 10;

  constructor(private pokemonService: PokemonService) { }

  getPokemons(): Observable<NearbyPokemon[]> {
    return of(this.data);
  }

  newPokemons(lat, long) {
    this.data.splice(0, this.data.length);
    return this.updatePokemons(lat, long);
  }

  updatePokemons(lat, long): Observable<NearbyPokemon[]> {
    return from(new Promise<NearbyPokemon[]>((resolve, reject) => {
      this.pokemonService.getAllPokemons().subscribe((a) => {
        for (let i = this.data.length; i < this.pokemonCount; i++) {
          let r = Math.round(this.randomRange(0, a.length - 1));
          let p = new NearbyPokemon(a[r], lat + this.randomDistance(), long + this.randomDistance());
          this.data.push(p);
        }
        this.updateDistance(lat, long);
        return resolve(this.data);
      })
    }));
  }

  getNearest(lat, long): Observable<NearbyPokemon> {
    this.updateDistance(lat, long);
    let lowest = 0;
    for (let i = 1; i < this.data.length; i++) {
      if (this.data[i].distance < this.data[lowest].distance) {
        lowest = i;
      }
    }
    return of(this.data[lowest]);
  }

  private updateDistance(lat, long) {
    this.data.forEach(element => {
      element.calculateDistance(lat, long);
    });
  }

  private randomDistance() {
    let lat = this.randomRange(0.003, 0.005);
    if(this.randomRange(0, 1) < 0.5) lat /= -1;
    return lat;
  }

  private randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
}
