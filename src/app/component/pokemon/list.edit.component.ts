import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-list.edit',
  templateUrl: './list.edit.component.html',
  styleUrls: ['./list.edit.component.scss'],
})
export class PokemonEditComponent implements OnInit {
  @Input() pokemon: Pokemon;

  constructor(private modalController: ModalController, private toastController: ToastController) { }

  ngOnInit() {
    console.log(this.pokemon)
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async save() {
    if (this.pokemon.validate()) {
      this.modalController.dismiss({
        'action': 'save'
      });
    } else {
      const toast = await this.toastController.create({
        message: 'Not all fields are filled',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
    }
  }
}
