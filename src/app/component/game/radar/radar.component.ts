import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NearbyPokemon } from 'src/app/model/nearbypokemon';
import { Subscription } from 'rxjs';
import { NearbypokemonService } from 'src/app/service/nearbypokemon.service';
import { AlertController, ModalController } from '@ionic/angular';
import { CaughtpokemonComponent } from '../caught/caughtpokemon/caughtpokemon.component';
import { Shake } from '@ionic-native/shake/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { CaughtpokemonService } from 'src/app/service/caughtpokemon.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
})
export class RadarComponent implements OnInit, OnDestroy {
  locationSubscription: Subscription;
  shakeSubscription: Subscription;
  pokemons: NearbyPokemon[] = [];
  lastCoords;

  constructor(private geolocation: Geolocation, private caughtService: CaughtpokemonService, private nearbyPokemonService: NearbypokemonService, private alertController: AlertController, private modalController: ModalController, private shake: Shake, private vibration: Vibration) { }

  ngOnInit() {
    let watch = this.geolocation.watchPosition();
    this.locationSubscription = watch.subscribe((data) => {
      if (data.coords) {
        this.lastCoords = data.coords;
        this.nearbyPokemonService.getCaughtPokemons(data.coords.latitude, data.coords.longitude).subscribe((caught) => {
          caught.forEach(element => this.caughtPokemon(element));
        })
        this.nearbyPokemonService.updatePokemons(data.coords.latitude, data.coords.longitude).subscribe((all) => {
          this.pokemons = all;
        })
      }
    }, async (err) => {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Could not get GPS location.',
        buttons: ['OK']
      });
      await alert.present();
    });
    this.shakeSubscription = this.shake.startWatch(60).subscribe(() => {
      this.catchNearest();
    })
  }

  catchNearest() {
    if (this.lastCoords) {
      this.nearbyPokemonService.catchNearest(this.lastCoords.latitude, this.lastCoords.longitude).subscribe(a => {
        this.caughtPokemon(a);
      });
    }
  }

  refresh(event) {
    if (this.lastCoords) {
      this.nearbyPokemonService.newPokemons(this.lastCoords.latitude, this.lastCoords.longitude).subscribe((all) => {
        this.pokemons = all;
        event.target.complete();
      })
    } else {
      event.target.complete();
    }
  }

  imgError(event) {
    event.target.hidden = true;
  }

  reorder(ev: any) {
    ev.detail.complete();
  }

  ngOnDestroy() {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
    if (this.shakeSubscription) {
      this.shakeSubscription.unsubscribe();
    }
  }

  private async caughtPokemon(pokemon: NearbyPokemon) {
    this.caughtService.addCaught(pokemon.base);
    this.vibration.vibrate(500);
    const modal = await this.modalController.create({
      component: CaughtpokemonComponent,
      componentProps: { 'source': this, 'pokemon': pokemon.base }
    });
    modal.present();
  }
}
