import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5 } from '../../models/HeWeather5';
@Component({
  selector: 'page-suggestion',
  templateUrl: 'suggestion.html'
})
export class SuggestionPage {
  cityname: string;
  suggestion: HeWeather5.Suggestion = {} as HeWeather5.Suggestion;//生活建议
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public weatherService: WeatherService, public events: Events) {
    this.events.subscribe('updateWeather', (force) => {
      this.updateWeather(force);
    });
  }
  ionViewDidEnter() {
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
    console.log('loadWeather');    
    this.suggestion = AppConfig.weatherData.suggestion;
  }
}
