import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5, } from '../../models/HeWeather5';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  city: string;
  // realtime: Realtime = {} as Realtime;
  // weather: Weather = {} as Weather;
  // wind: Wind = {} as Wind;
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public weatherService: WeatherService) {
  }

  ionViewDidLoad() {
    this.loadWeather();
  }

  async loadWeather() {
    AppConfig.city = null;
    AppConfig.city = await this.weatherService.getCity();
    console.log('AppConfig.city', AppConfig.city);
    if (AppConfig.city != null) {
      this.city = AppConfig.city;
      AppConfig.weatherData = await this.weatherService.getWeatherData(AppConfig.city) as HeWeather5;
      console.log('AppConfig.weatherData', AppConfig.weatherData);
      if (AppConfig.weatherData != null) {
        // this.realtime = AppConfig.weatherData.realtime;
        // this.weather = this.realtime.weather;
        // this.wind = this.realtime.wind;
      } else {
        alert('获取天气失败！');
      }
    } else {
      alert('定位城市失败！');
    }
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
