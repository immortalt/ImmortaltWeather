import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';
import { HeWeather5 } from '../models/HeWeather5';
import { City } from '../models/city';

@Injectable()
export class WeatherService {
    constructor(public http: Http, public api: Api) {
    }
    async searchCity(name) {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            let r = that.api.getData('http://www.nmc.cn/f/rest/autocomplete',
                {
                    q: name,
                    limit: 10
                });
            r.subscribe((r: string) => {
                let citys: City[] = [];
                let strcitys = r.split('\n');
                for (var i in strcitys) {
                    let vals = strcitys[i].split('|');
                    // console.log(vals);
                    let city: City = {
                        code: vals[0],
                        name: vals[1],
                        zipcode: vals[2],
                        province: vals[3],
                        pingying: vals[4]
                    }
                    if (city.name != null) {
                        citys.push(city);
                    }
                }
                // console.log(citys);
                resolve(citys);
            }, err => {
                console.log(err);
                resolve(null);
            })
        });
        return p;
    }
    async getCity() {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            let r = that.api.getData('http://ip-api.com/json', {});
            r.subscribe(r => {
                console.log(r);
                if (r != null && r.city != null) {
                    resolve(r.city);
                } else {
                    console.log(r);
                    resolve(null);
                }
            }, err => {
                console.log(err);
                resolve(null);
            })
        });
        return p;
    }
    baseurl = 'http://weatherapi.immortalt.com:8888/api/';
    getWeatherData(city: string) {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            let params: any = {};
            params['city'] = city;
            let r = that.api.getData(that.baseurl + 'weather/query', params);
            r.subscribe(r => {
                if (r != null && r.HeWeather5 != null) {
                    console.log(r.HeWeather5[0]);
                    resolve(r.HeWeather5[0]);
                } else {
                    console.log(r);
                    resolve(null);
                }
            }, err => {
                console.log(err);
                resolve(null);
            });
        });
        return p;
    }
}
