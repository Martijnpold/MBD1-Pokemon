import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-caughtpokemon',
  templateUrl: './caughtpokemon.component.html',
  styleUrls: ['./caughtpokemon.component.scss'],
})
export class CaughtpokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
