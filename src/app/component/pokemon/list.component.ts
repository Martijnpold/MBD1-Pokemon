import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../../service/pokemon.service'
import { Pokemon } from '../../model/pokemon'
import { PokemonListPopoverComponent } from './list.popover.component'
import { PopoverController, ModalController, ToastController, AlertController } from '@ionic/angular';
import { PokemonEditComponent } from './list.edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: Pokemon[];
  currentPopover;

  constructor(private pokemonService: PokemonService, private alertController: AlertController, private popoverController: PopoverController, private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    this.pokemons = [];
    this.loadData(null);
  }

  loadData(event) {
    let index = (this.pokemons.length > 0) ? this.pokemons[this.pokemons.length - 1].id + 1 : 1
    this.pokemonService.getPokemons(index, 20).subscribe((loaded) => {
      this.pokemons.push(...loaded);
      if (event) {
        event.target.complete();
        if (loaded.length == 0) {
          event.target.disabled = true;
        }
      }
    }, async (err) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Could not reach the pokemon API.',
        buttons: ['OK']
      });
      await alert.present();
      if (event) {
        event.target.complete();
      }
    })
  }

  async itemClick(event, pokemon) {
    const popover = await this.popoverController.create({
      component: PokemonListPopoverComponent,
      event: event,
      translucent: true,
      componentProps: { 'source': this, 'pokemon': pokemon }
    });
    popover.onWillDismiss().then((data) => {
      if (data.data) {
        switch (data.data.action) {
          case 'delete':
            this.delete(pokemon);
            break;
          case 'edit':
            this.edit(pokemon);
        }
      }
    });
    this.currentPopover = popover;
    await popover.present();
  }

  async create() {
    let copy = Object.assign(new Pokemon, this.pokemons[0]);
    this.pokemonService.getAvailableId().subscribe(async (id) => {
      copy.id = id;
      const modal = await this.modalController.create({
        component: PokemonEditComponent,
        componentProps: { 'source': this, 'pokemon': copy }
      });
      modal.onWillDismiss().then((data) => {
        if (data.data) {
          switch (data.data.action) {
            case 'save':
              this.pokemonService.updatePokemon(copy);
              this.pokemons.push(copy);
              this.presentToast('Saved the pokemon ' + copy.name, 2000)
          }
        }
      })
      modal.present();
    })
  }

  private async edit(pokemon: Pokemon) {
    let copy = Object.assign(new Pokemon, pokemon);
    const modal = await this.modalController.create({
      component: PokemonEditComponent,
      componentProps: { 'source': this, 'pokemon': copy }
    });
    modal.onWillDismiss().then((data) => {
      if (data.data) {
        switch (data.data.action) {
          case 'save':
            Object.assign(pokemon, copy)
            this.pokemonService.updatePokemon(pokemon)
            this.presentToast('Saved the pokemon ' + pokemon.name, 2000)
        }
      }
    })
    modal.present();
  }

  private delete(pokemon: Pokemon) {
    pokemon.deleted = true;
    this.pokemonService.updatePokemon(pokemon);
    for (let i = this.pokemons.length - 1; i >= 0; i--) {
      if (this.pokemons[i].deleted) {
        this.pokemons.splice(i, 1);
      }
    }
    this.presentToast('Deleted the pokemon ' + pokemon.name, 2000, "warning")
  }

  imgError(event) {
    event.target.hidden = true;
  }

  async presentToast(message: string, time: number, color = "success") {
    const toast = await this.toastController.create({
      message: message,
      duration: time,
      color: color
    });
    toast.present();
  }
}
