import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { CaughtpokemonService } from 'src/app/service/caughtpokemon.service';

@Component({
  selector: 'app-caughtlist',
  templateUrl: './caughtlist.component.html',
  styleUrls: ['./caughtlist.component.scss'],
})
export class CaughtlistComponent implements OnInit {
  private pokemons: Pokemon[] = [];

  constructor(private caughtService: CaughtpokemonService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.caughtService.getCaught().subscribe((a) => {
      this.pokemons = a;
    })
  }

  imgError(event) {
    event.target.hidden = true;
  }

  reset() {
    this.caughtService.reset();
    this.load();
  }
}
