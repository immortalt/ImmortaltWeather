import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5 } from '../../models/HeWeather5';
import { SearchPage } from '../../pages/search/search';
import { Settings } from '../../providers/providers';

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
  wind: HeWeather5.Wind3 = {} as HeWeather5.Wind3;//风向

  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public weatherService: WeatherService, public settings: Settings) {
  }
  ngOnInit() {
  }
  ionViewDidLoad() {
    this.updateWeather(false);
  }

  //更新天气
  //force：是否强制刷新
  async updateWeather(force: boolean) {
    if (AppConfig.weatherData == null || force) {//如果需要重新获取数据
      if (AppConfig.cityname == null) {
        AppConfig.cityname = await this.weatherService.getCity();
        console.log('AppConfig.cityname', AppConfig.cityname);
      }
      if (AppConfig.cityname != null) {
        this.cityname = AppConfig.cityname;
        AppConfig.weatherData = await this.weatherService.getWeatherData(AppConfig.cityname) as HeWeather5.Data;
        console.log('AppConfig.weatherData', AppConfig.weatherData);
        if (AppConfig.weatherData != null) {
          this.loadWeather();
        } else {
          alert('获取天气失败！');
        }
      } else {
        alert('定位城市失败！');
      }
    } else {
      this.loadWeather();
    }
  }
  //载入天气
  loadWeather() {
    try {
      this.basic = AppConfig.weatherData.basic;
      this.update = this.basic.update;
      this.city = AppConfig.weatherData.aqi.city;
      this.now = AppConfig.weatherData.now;
      this.cond = AppConfig.weatherData.now.cond;
      this.wind = this.now.wind;
      this.cityname = this.basic.city;
    } catch (err) {
      console.log(err);
    }
  }
  getWeatherIcon(code: string): string {
    return AppConfig.weatherFolder + code + ".png";
  }
  switchPlace() {
    // this.navCtrl.push(SearchPage);
    let addModal = this.modalCtrl.create(SearchPage);
    addModal.onDidDismiss(data => {
      console.log(data);
      if (data.city != null) {
        let city = data.city as HeWeather5.CityBasic;
        AppConfig.cityname = city.city;
        this.settings.load().then(() => {
          let history: HeWeather5.CityBasic[] = this.settings.settings.cityHistory;
          if (history.length > 5) {
            history.pop();
          }
          if (history.filter(t => t.id == city.id).length == 0) {
            history.push(city);
          }
          this.settings.setValue('cityHistory', history);
          this.settings.setValue('cityname', AppConfig.cityname);
          this.updateWeather(true);
        });
      }
    })
    addModal.present();
  }
}
