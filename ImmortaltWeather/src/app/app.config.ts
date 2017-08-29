import { HeWeather5 } from '../models/HeWeather5';

export class AppConfig {
    /**
             * IP
             */
    public static IP: any = null;
    /**
         * 所在城市
         */
    public static cityname: any = null;
    /**
         * 城市列表
         */
    public static citys: string[] = [];
    /**
     * 得到的天气信息
     */
    public static weatherData: HeWeather5.Data = null;
}
