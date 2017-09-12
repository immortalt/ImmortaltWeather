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
     * 得到的天气信息
     */
    public static weatherData: HeWeather5.Data = null;
    /**
     * 天气图标
     */
    public static weatherFolder: string = 'assets/img/weather/';
    /**
     * Ionic 框架配置
     */
    static ionicConfig = {
        backButtonText: '返回',
        // locationStrategy: 'path',
        modalEnter: 'modal-slide-in',
        modalLeave: 'modal-slide-out',
        tabsPlacement: 'bottom',
        tabsHideOnSubPages: true,
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthShortNames: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
        dayNames: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        dayShortNames: ['周天', '周一', '周二', '周三', '周四', '周五', '周六']
    };
     /** 
     * 加载动画参数
    */
    static toastParam = {
        /**
         * 提示信息位置
         */
        position: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
        },
        /**
         * 默认关闭时间
         */
        duration: 1500,
        /**
         * 关闭按钮默认文字
         */
        clostBtnText: '关闭'
    };
}
