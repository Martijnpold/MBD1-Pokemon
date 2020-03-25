import { Component, OnInit, OnDestroy } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NearbyPokemon } from 'src/app/model/nearbypokemon';
import { Subscription } from 'rxjs';
import { NearbypokemonService } from 'src/app/service/nearbypokemon.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
})
export class RadarComponent implements OnInit, OnDestroy {
  locationSubscription: Subscription;
  pokemons: NearbyPokemon[] = [];
  nearestPokemon: NearbyPokemon;
  lastCoords;

  constructor(private geolocation: Geolocation, private nearbyPokemonService: NearbypokemonService, public alertController: AlertController) { }

  ngOnInit() {
    let watch = this.geolocation.watchPosition();
    this.locationSubscription = watch.subscribe((data) => {
      if (data.coords) {
        this.lastCoords = data.coords;
        this.nearbyPokemonService.updatePokemons(data.coords.latitude, data.coords.longitude).subscribe((all) => {
          this.pokemons = all;
          this.nearbyPokemonService.getNearest(data.coords.latitude, data.coords.longitude).subscribe((pokemon) => {
            this.nearestPokemon = pokemon;
          })
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
  }

  refresh(event) {
    if (this.lastCoords) {
      this.nearbyPokemonService.newPokemons(this.lastCoords.latitude, this.lastCoords.longitude).subscribe((all) => {
        this.pokemons = all;
        this.nearbyPokemonService.getNearest(this.lastCoords.latitude, this.lastCoords.longitude).subscribe((nearest) => {
          this.nearestPokemon = nearest;
          event.target.complete();
        })
      })
    } else {
      event.target.complete();
    }
  }

  imgError(event) {
    event.target.hidden = true;
  }

  ngOnDestroy() {
    if (this.locationSubscription) {
      this.locationSubscription.unsubscribe();
    }
  }
}
