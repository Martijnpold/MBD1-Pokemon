import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonListComponent } from './component/pokemon/list.component';
import { HttpClientModule } from '@angular/common/http';
import { PokemonListPopoverComponent } from './component/pokemon/list.popover.component';
import { PokemonEditComponent } from './component/pokemon/list.edit.component';
import { FormsModule } from '@angular/forms';
import { RadarComponent } from './component/game/radar/radar.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Shake } from '@ionic-native/shake/ngx';
import { CaughtpokemonComponent } from './component/game/caught/caughtpokemon/caughtpokemon.component';
import { Vibration } from '@ionic-native/vibration/ngx';
import { CaughtlistComponent } from './component/game/caught/list/caughtlist/caughtlist.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonListPopoverComponent,
    PokemonEditComponent,
    RadarComponent,
    CaughtpokemonComponent,
    CaughtlistComponent,
  ],
  entryComponents: [
    PokemonListPopoverComponent,
    PokemonEditComponent,
    CaughtpokemonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    Vibration,
    Shake
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
