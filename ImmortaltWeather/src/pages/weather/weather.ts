import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5 } from '../../models/HeWeather5';

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage {
  cityname: string;
  basic: HeWeather5.Basic = {} as HeWeather5.Basic;//基本信息
  update: HeWeather5.Update = {} as HeWeather5.Update;//更新时间
  now: HeWeather5.Now = {} as HeWeather5.Now;//当前情况
  cond: HeWeather5.Cond3 = {} as HeWeather5.Cond3;//当前情况
  city: HeWeather5.City = {} as HeWeather5.City;//城市空气指数
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public weatherService: WeatherService) {
  }

  ionViewDidLoad() {
    this.loadWeather();
  }

  async loadWeather() {
    AppConfig.cityname = await this.weatherService.getCity();
    console.log('AppConfig.cityname', AppConfig.cityname);
    if (AppConfig.cityname != null) {
      this.cityname = AppConfig.cityname;
      AppConfig.weatherData = await this.weatherService.getWeatherData(AppConfig.cityname) as HeWeather5.Data;
      console.log('AppConfig.weatherData', AppConfig.weatherData);
      if (AppConfig.weatherData != null) {
        this.basic = AppConfig.weatherData.basic;
        this.update = this.basic.update;
        this.city = AppConfig.weatherData.aqi.city;
        this.now = AppConfig.weatherData.now;
        this.cond = AppConfig.weatherData.now.cond;
      } else {
        alert('获取天气失败！');
      }
    } else {
      alert('定位城市失败！');
    }
  }
  getWeatherIcon(code: string): string {
    return AppConfig.weatherFolder + code + ".png";
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
