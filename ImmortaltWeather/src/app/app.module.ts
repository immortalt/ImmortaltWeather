import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { AppConfig } from './app.config';

import { CardsPage } from '../pages/cards/cards';
import { ContentPage } from '../pages/content/content';
// import { MapPage } from '../pages/map/map';
import { SearchPage } from '../pages/search/search';
import { SettingsPage } from '../pages/settings/settings';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { WeatherPage } from '../pages/weather/weather';
import { TrendPage } from '../pages/trend/trend';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { LineChartComponent } from '../components/line-chart/line-chart';

import { Api } from '../providers/api';
import { Settings } from '../providers/settings';
import { WeatherService } from '../providers/weather-service';

// import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DataPipe } from '../pipes/Data.pipe';
import { TempPipe } from '../pipes/Temp.pipe';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    option1: true,
    option2: 'Ionitron J. Framework',
    option3: '1',
    option4: 'Hello',
    isFirstStart: true,
    cityname: null,
    cityHistory: []
  });
}

@NgModule({
  declarations: [
    MyApp,
    CardsPage,
    ContentPage,
    // MapPage,
    SearchPage,
    SettingsPage,
    TabsPage,
    TutorialPage,
    WeatherPage,
    TrendPage,
    SuggestionPage,
    
    LineChartComponent,
    
    DataPipe, TempPipe
  ],
  exports: [DataPipe, TempPipe],
  imports: [
    BrowserModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp, AppConfig.ionicConfig),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CardsPage,
    ContentPage,
    // MapPage,
    SearchPage,
    SettingsPage,
    TabsPage,
    TutorialPage,
    WeatherPage,
    TrendPage,
    SuggestionPage
  ],
  providers: [
    WeatherService,
    Api,
    // Camera,
    SplashScreen,
    StatusBar,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
