import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { Item } from '../models/item';

@Injectable()
export class WeatherService {

    constructor(public http: Http, public api: Api) {
    }

    query(params?: any) {
        params['key'] = '9f080741346f10e5858c16e3e092e10e';     
        return this.api.getData('http://op.juhe.cn/onebox/weather/query', params);
    }
}
