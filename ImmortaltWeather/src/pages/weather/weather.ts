import { Component } from '@angular/core';
import { NavController, ModalController, Events, AlertController, ToastController } from 'ionic-angular';
import { AbstractComponent } from '../../interfaces/abstract-component';

import { WeatherService } from '../../providers/providers';
import { AppConfig } from '../../app/app.config';
import { HeWeather5 } from '../../models/HeWeather5';
import { SearchPage } from '../../pages/search/search';
import { Settings } from '../../providers/providers';
declare let cordova: any;

@Component({
  selector: 'page-weather',
  templateUrl: 'weather.html'
})
export class WeatherPage extends AbstractComponent {
  backImg;
  cityname: string;
  basic: HeWeather5.Basic = {} as HeWeather5.Basic;//基本信息
  update: HeWeather5.Update = {} as HeWeather5.Update;//更新时间
  now: HeWeather5.Now = {} as HeWeather5.Now;//当前情况
  cond: HeWeather5.Cond3 = {} as HeWeather5.Cond3;//当前情况
  city: HeWeather5.City = {} as HeWeather5.City;//城市空气指数
  wind: HeWeather5.Wind3 = {} as HeWeather5.Wind3;//风向
  audio;//audio组件
  audioInited: boolean;//audio是否初始化
  hourly_forecast;
  hourTrendData: HeWeather5.HourlyForecast[];
  constructor(public navCtrl: NavController, public modalCtrl: ModalController
    , public weatherService: WeatherService, public settings: Settings,
    public events: Events, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    super(null, navCtrl, toastCtrl, null, null, alertCtrl);
    this.events.subscribe('updateWeather', (force) => {
      this.updateWeather(force);
    });
  }
  async ngOnInit() {
    this.audio = document.getElementById('bgmusic') as HTMLAudioElement;
    var that = this;
    document.addEventListener("touchstart",
      () => {
        console.log('touchstart');
        that.initAudio('touchstart');
      }
      , false);
    await this.updateWeather(false);
    this.doDetect();
    this.detectTemp();
  }
  detectTemp() {
    setInterval(() => {
      this.updateWeather(true);
      this.doDetect();
    }, 1000 * 60 * 60);//60分钟自动检测一次
  }
  doDetect() {
    if (AppConfig.weatherData != null && AppConfig.weatherData.status == "ok") {
      this.hourly_forecast = AppConfig.weatherData.hourly_forecast;
      console.log('this.hourly_forecast', this.hourly_forecast);
      if (this.hourly_forecast != null && this.hourly_forecast.length > 0) {
        let tempDiff = (+this.hourly_forecast[this.hourly_forecast.length - 1].tmp) -
          (+this.hourly_forecast[0].tmp);
        if (tempDiff <= -5) {
          this.sendNotification("今天的降温将超过5度，请注意保暖哟");
        } else if (tempDiff >= 5) {
          this.sendNotification("今天的升温将超过5度，不要穿太厚哟");
        }
        console.log(tempDiff);
      }
    }
  }
  sendNotification(text, title?: any) {
    if (AppConfig.enableNotification) {
      console.log(text, title);
      if (title == null) {
        title = '不朽天气提醒';
      }
      var now = new Date().getTime();
      if (AppConfig.isAPP) {
        cordova.plugins.notification.local.schedule({
          id: 1,
          title: title,
          text: text,
          at: now
        });
      }
    }
  }
  initAudio(origin) {
    console.log("initAudio-origin", origin);
    // alert(origin);
    if (this.audioInited == false) {
      this.audio.play();
      this.audioInited = true;
    }
  }
  async ionViewDidEnter() {
    if (AppConfig.enableBingPic) {
      this.backImg = { 'background-image': "url('https://cn.bing.com/ImageResolution.aspx?w=640&h=360')" };
    } else {
      this.backImg = { 'background-image': "url('" + AppConfig.backImg + "')" };
    }
    await this.updateWeather(false);
  }
  doRefresh() {
    this.updateWeather(true);
  }
  //更新天气
  //force：是否强制刷新
  async updateWeather(force: boolean) {
    console.log('updateWeather-AppConfig.cityname', AppConfig.cityname);

    if (AppConfig.weatherData == null || force) {//如果需要重新获取数据
      if (AppConfig.cityname == null) {
        console.log('正在定位');
        let t = await this.weatherService.getCity();
        console.log('定位', t);
        AppConfig.cityname = t;
        console.log('AppConfig.cityname', AppConfig.cityname);
      }
      if (AppConfig.cityname != null) {
        this.cityname = AppConfig.cityname;
        AppConfig.weatherData = await this.weatherService.getWeatherData(AppConfig.cityname) as HeWeather5.Data;
        console.log('AppConfig.weatherData', AppConfig.weatherData);
        if (AppConfig.weatherData != null) {
          this.loadWeather();
        } else {
          this.showMessage('获取天气失败！');
        }
      } else {
        AppConfig.cityname = '昆明';
        // this.showMessage('定位城市失败！');
      }
    } else {
      this.loadWeather();
    }
  }
  //载入天气
  loadWeather() {
    console.log('loadWeather');
    try {
      this.basic = AppConfig.weatherData.basic;
      this.update = this.basic.update;
      this.city = AppConfig.weatherData.aqi.city;
      this.now = AppConfig.weatherData.now;
      this.cond = AppConfig.weatherData.now.cond;
      this.wind = this.now.wind;
      this.cityname = this.basic.city;
    } catch (err) {
      console.log(err);
    }
  }
  getWeatherIcon(code: string): string {
    return AppConfig.weatherFolder + code + ".png";
  }
  switchPlace() {
    // this.navCtrl.push(SearchPage);
    let addModal = this.modalCtrl.create(SearchPage);
    addModal.onDidDismiss(data => {
      console.log(data);
      if (data.city != null) {
        let city = data.city as HeWeather5.CityBasic;
        AppConfig.cityname = city.city;
        this.settings.load().then(() => {
          let history: HeWeather5.CityBasic[] = this.settings.settings.cityHistory;
          if (history.length > 5) {
            history.pop();
          }
          if (history.filter(t => t.id == city.id).length == 0) {
            history.push(city);
          }
          this.settings.setValue('cityHistory', history);
          this.settings.setValue('cityname', AppConfig.cityname);
          this.updateWeather(true);
        });
      }
    })
    addModal.present();
  }
  playWeather() {
    var str = "今天天气" + this.cond.txt + "，温度" + this.now.tmp + "摄氏度，湿度" + this.now.hum + "%";
    this.speakText(str);
  }
  speakText(str) {
    // baidu语音接口
    var url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&text=" + encodeURI(str);
    this.audio.src = url;
    this.audio.play();
  }
}
