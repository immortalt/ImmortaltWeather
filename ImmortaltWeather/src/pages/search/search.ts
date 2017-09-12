import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { WeatherService } from '../../providers/providers';
import { City } from '../../models/city';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  currentCitys: City[];
  constructor(public viewCtrl: ViewController, public weatherService: WeatherService) { }
  close() {
    this.viewCtrl.dismiss({ city: null });
  }
  //查找城市
  async getCitys(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentCitys = [];
      return;
    }
    let citys = await this.weatherService.searchCity(val);
    this.currentCitys = citys as City[];
  }
  //选择城市
  selectCity(city: City) {
    this.viewCtrl.dismiss({ city: city.name });
  }
}
