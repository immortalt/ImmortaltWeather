export module HeWeather5 {
    export interface City {
        aqi: string;
        co: string;
        no2: string;
        o3: string;
        pm10: string;
        pm25: string;
        qlty: string;
        so2: string;
    }

    export interface Aqi {
        city: City;
    }

    export interface Update {
        loc: string;
        utc: string;
    }

    export interface Basic {
        city: string;
        cnty: string;
        id: string;
        lat: string;
        lon: string;
        update: Update;
    }

    export interface Astro {
        mr: string;
        ms: string;
        sr: string;
        ss: string;
    }

    export interface Cond {
        code_d: string;
        code_n: string;
        txt_d: string;
        txt_n: string;
    }

    export interface Tmp {
        max: string;
        min: string;
    }

    export interface Wind {
        deg: string;
        dir: string;
        sc: string;
        spd: string;
    }

    export interface DailyForecast {
        astro: Astro;
        cond: Cond;
        date: string;
        hum: string;
        pcpn: string;
        pop: string;
        pres: string;
        tmp: Tmp;
        uv: string;
        vis: string;
        wind: Wind;
    }

    export interface Cond2 {
        code: string;
        txt: string;
    }

    export interface Wind2 {
        deg: string;
        dir: string;
        sc: string;
        spd: string;
    }

    export interface HourlyForecast {
        cond: Cond2;
        date: string;
        hum: string;
        pop: string;
        pres: string;
        tmp: string;
        wind: Wind2;
    }

    export interface Cond3 {
        code: string;
        txt: string;
    }

    export interface Wind3 {
        deg: string;
        dir: string;
        sc: string;
        spd: string;
    }

    export interface Now {
        cond: Cond3;
        fl: string;
        hum: string;
        pcpn: string;
        pres: string;
        tmp: string;
        vis: string;
        wind: Wind3;
    }

    export interface Air {
        brf: string;
        txt: string;
    }

    export interface Comf {
        brf: string;
        txt: string;
    }

    export interface Cw {
        brf: string;
        txt: string;
    }

    export interface Drsg {
        brf: string;
        txt: string;
    }

    export interface Flu {
        brf: string;
        txt: string;
    }

    export interface Sport {
        brf: string;
        txt: string;
    }

    export interface Trav {
        brf: string;
        txt: string;
    }

    export interface Uv {
        brf: string;
        txt: string;
    }

    export interface Suggestion {
        air: Air;
        comf: Comf;
        cw: Cw;
        drsg: Drsg;
        flu: Flu;
        sport: Sport;
        trav: Trav;
        uv: Uv;
    }

    export interface Data {
        aqi: Aqi;
        basic: Basic;
        daily_forecast: DailyForecast[];
        hourly_forecast: HourlyForecast[];
        now: Now;
        status: string;
        suggestion: Suggestion;
    }
}