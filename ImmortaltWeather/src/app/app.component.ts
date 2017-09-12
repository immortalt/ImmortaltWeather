import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { CardsPage } from '../pages/cards/cards';
// import { ContentPage } from '../pages/content/content';
import { FirstRunPage } from '../pages/pages';
// import { MapPage } from '../pages/map/map';
// import { SearchPage } from '../pages/search/search';
// import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
// import { TutorialPage } from '../pages/tutorial/tutorial';
// import { WeatherPage } from '../pages/weather/weather';
// import { TrendPage } from '../pages/trend/trend';
// import { SuggestionPage } from '../pages/suggestion/suggestion';
import { AppConfig } from '../app/app.config';

import { Settings } from '../providers/providers';

import { TranslateService } from '@ngx-translate/core'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage;

  @ViewChild(Nav) nav: Nav;

  // pages: any[] = [
  //   { title: 'Suggestion', component: SuggestionPage },
  //   { title: 'Trend', component: WeatherPage },
  //   { title: 'Weather', component: WeatherPage },
  //   { title: 'Tutorial', component: TutorialPage },
  //   { title: 'Tabs', component: TabsPage },
  //   { title: 'Cards', component: CardsPage },
  //   { title: 'Content', component: ContentPage },
  //   { title: 'Map', component: MapPage },
  //   { title: 'Settings', component: SettingsPage },
  //   { title: 'Search', component: SearchPage }
  // ]

  constructor(private translate: TranslateService, private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    this.initTranslate();
    settings.load().then(() => {
      AppConfig.tempFormat = settings.settings.option3;
      AppConfig.cityname = settings.settings.cityname;
      let isFirstStart = settings.settings.isFirstStart;
      console.log('settings.settings', settings.settings);
      if (isFirstStart == true) {
        settings.setValue("isFirstStart", false);
        this.rootPage = FirstRunPage;
      } else {
        this.rootPage = TabsPage;
      }
    });
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('zh');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('zh'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
