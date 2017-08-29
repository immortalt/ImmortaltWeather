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
  }

  ionViewDidLoad() {
    let cityname = '昆明';
    this.weatherService.getWeatherData(cityname).subscribe(r => {
      if (r != null && r.error_code == 0 && r.result.data != null) {
        var data = r.result.data;
        console.log(data);
      }
    }, err => {
      console.log(err);
    });
  }

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
