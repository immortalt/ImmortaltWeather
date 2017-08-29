import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

@Injectable()
export class WeatherService {

    constructor(public http: Http, public api: Api) {
    }
    async getIP() {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            let r = that.api.getData('http://ipv4.myexternalip.com/json', {});
            r.subscribe(r => {
                if (r != null && r.ip != null) {
                    resolve(r.ip);
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
    async getCity(IP: string) {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            let r = that.api.getData('http://ip.taobao.com/service/getIpInfo.php', { ip: IP });
            r.subscribe(r => {
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
    baseurl = 'https://free-api.heweather.com/v5/';
    getWeatherData(city: string) {
        var that = this;
        var p = new Promise(function (resolve, reject) {
            let params: any = {};
            params['key'] = '3e97be1f98e64aa59ca2d1c85a6360bc  ';
            params['city'] = city;
            let r = that.api.getData(that.baseurl + 'weather', params);
            r.subscribe(r => {
                if (r != null && r.error_code == 0 && r.result.data != null) {
                    resolve(r.result.data);
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
