import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public weatherService: WeatherService) {
    // this.currentItems = this.items.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
    let params = { 'cityname': '昆明' };
    this.weatherService.query(params).subscribe(r => {
      if (r != null && r.error_code == 0 && r.result.data != null) {
        var data = r.result.data;
        console.log(data);
      }
    }, err => {
      console.log(err);
    });
  }
  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addPlace() {
    // let addModal = this.modalCtrl.create(ItemCreatePage);
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.items.add(item);
    //   }
    // })
    // addModal.present();
  }
}
