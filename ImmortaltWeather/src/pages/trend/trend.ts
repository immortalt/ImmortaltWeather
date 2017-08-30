import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5 } from '../../models/HeWeather5';

@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html'
})
export class TrendPage {
  cityname: string;
  hourly_forecast: HeWeather5.HourlyForecast[] = [];
  daily_forecast: HeWeather5.DailyForecast[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams
    , public weatherService: WeatherService) { }
  ionViewDidLoad() {
    this.uopdateWeather(false);
  }
  //更新天气
  //force：是否强制刷新
  async uopdateWeather(force: boolean) {
    if (AppConfig.weatherData == null || force) {//如果需要重新获取数据
      AppConfig.cityname = await this.weatherService.getCity();
      console.log('AppConfig.cityname', AppConfig.cityname);
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
    this.hourly_forecast = AppConfig.weatherData.hourly_forecast;
    this.daily_forecast = AppConfig.weatherData.daily_forecast;
  }
  getWeatherIcon(code: string): string {
    return AppConfig.weatherFolder + code + ".png";
  }
}
