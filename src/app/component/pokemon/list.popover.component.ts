import { Component, OnInit, Input } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Pokemon } from 'src/app/model/pokemon';

@Component({
  selector: 'app-list.popover',
  templateUrl: './list.popover.component.html',
  styleUrls: ['./list.popover.component.scss'],
})
export class PokemonListPopoverComponent implements OnInit {
  @Input() source;
  @Input() pokemon: Pokemon;

  constructor(private popoverController: PopoverController, private alertController: AlertController) {
  }

  ngOnInit() { }

  editPokemon() {
    this.popoverController.dismiss({
      'action': 'edit'
    });
  }

  imgError(event) {
    event.target.hidden = true;
  }

  async deletePokemon() {
    const alert = await this.alertController.create({
      header: 'Delete this Pokemon?',
      message: 'Are you sure you want to permanently delete this pokemon?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.popoverController.dismiss({
              'action': 'delete'
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
