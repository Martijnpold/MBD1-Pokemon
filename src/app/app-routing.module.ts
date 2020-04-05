import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './component/pokemon/list.component';
import { RadarComponent } from './component/game/radar/radar.component';
import { CaughtlistComponent } from './component/game/caught/list/caughtlist/caughtlist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'radar',
    pathMatch: 'full'
  },
  {
    path: 'caught',
    component: CaughtlistComponent
  },
  {
    path: 'pokedex',
    component: PokemonListComponent
  },
  {
    path: 'radar',
    component: RadarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
