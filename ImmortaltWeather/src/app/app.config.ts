import { HeWeather5 } from '../models/HeWeather5';

export class AppConfig {

    /**
         * 所在城市
         */
    public static city: any = null;
    /**
         * 城市列表
         */
    public static citys: string[] = [];
    /**
     * 得到的天气信息
     */
    public static weatherData: HeWeather5 = null;
}
