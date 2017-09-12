import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { WeatherService } from '../../providers/providers';
import { HeWeather5 } from '../../models/HeWeather5';
import { Settings } from '../../providers/providers';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  cityname: string;
  currentCitys: HeWeather5.CityBasic[] = [];
  cityHistory: HeWeather5.CityBasic[] = [];
  constructor(public viewCtrl: ViewController, public weatherService: WeatherService
    , public settings: Settings) {
  }
  ionViewDidEnter() {
    this.settings.getValue('cityHistory').then(data => {
      this.cityHistory = data;
    });
  }
  isShowHistory() {
    return this.cityname == null && this.cityHistory != null && this.cityHistory.length > 0;
  }
  close() {
    this.viewCtrl.dismiss({ city: null });
  }
  //查找城市
  async getCitys(ev) {
    let val = ev.target.value;
    this.cityname = val;
    if (!val || !val.trim()) {
      this.currentCitys = [];
      return;
    }
    let citys: HeWeather5.CityBasic[] = await this.weatherService.searchCity(val) as HeWeather5.CityBasic[];
    console.log('citys', citys);
    this.currentCitys = citys;
  }
  //选择城市
  selectCity(city: HeWeather5.CityBasic) {
    this.viewCtrl.dismiss({ city: city });
  }
}
