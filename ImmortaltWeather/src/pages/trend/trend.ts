import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5 } from '../../models/HeWeather5';
import { CommonData } from '../../models/CommonData';




@Component({
  selector: 'page-trend',
  templateUrl: 'trend.html'
})
export class TrendPage {
  cityname: string;
  hourly_forecast: HeWeather5.HourlyForecast[] = [];
  daily_forecast: HeWeather5.DailyForecast[] = [];

  // hourTrendLabels: any = ["湿度", "降水概率", "气压", "温度", "风向角度", "风力", "风速"];
  hourTrendData: any = {
    date: new CommonData("时间", null),
    hum: new CommonData("湿度", null),
    pop: new CommonData("降水概率", null),
    pres: new CommonData("气压", null),
    tmp: new CommonData("温度", null)
  };

  chartType: string = "温度";

  constructor(public navCtrl: NavController, public navParams: NavParams
    , public weatherService: WeatherService, public events: Events) {
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
    this.hourly_forecast = AppConfig.weatherData.hourly_forecast;

    for (let key in this.hourTrendData) {
      this.hourTrendData[key].val = this.mapObject(this.hourly_forecast, key);
    }
    // console.info(this.hourTrendData)

    this.daily_forecast = AppConfig.weatherData.daily_forecast;
  }
  getWeatherIcon(code: string): string {
    return AppConfig.weatherFolder + code + ".png";
  }

  //获取映射值
  mapObject(arr, prop) {
    if (Array.isArray(arr))
      return arr.map(e => {
        return e[prop]
      })
    else console.error("传入了非数组的值")
  }
}
