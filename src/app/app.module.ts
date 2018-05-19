import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProjetoTCCBrendaPage } from '../pages/projeto-tccbrenda/projeto-tccbrenda';
import { listaProxPage } from '../pages/lista-prox/lista-prox';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { NovolocalPage } from '../pages/novolocal/novolocal';
import { MapProxPage } from '../pages/Map-prox/Map-prox';
import { SugerirPage } from '../pages/sugerir/sugerir';

import { Geolocation } from '@ionic-native/geolocation'; //plugin nativo cordova instalado via npm 


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';

import { myService } from '../pages/services/data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //<<<<por causa do erro do ngmodule nos cadastros
import { CommonModule } from '@angular/common'; //<<<<por causa do erro do ngmodule nos cadastros



//imports do firebase 6.0
//import {FirebaseListObservable, 
// FirebaseObjectObservable } from 'angularfire2/database-deprecated';
//imports do firebase 4.0
import {
  AngularFireDatabaseModule,
  /* AngularFireDatabase*/
} from "angularfire2/database";
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { SugestoesPage } from '../pages/sugestoes/sugestoes';
import { Device } from '@ionic-native/device';
import { GoogleMaps } from '@ionic-native/google-maps';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { DetalheseventoPage } from '../pages/detalhesevento/detalhesevento';




var config = {
  apiKey: "AIzaSyDvXaxJqvlH_84DrxytYNF341Ax67H1OU8",
  authDomain: "geoloc-179420.firebaseapp.com",
  databaseURL: "https://geoloc-179420.firebaseio.com",
  projectId: "geoloc-179420",
  storageBucket: "geoloc-179420.appspot.com",
  messagingSenderId: "241352714682"
};

firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    ProjetoTCCBrendaPage,
    listaProxPage,
    MapProxPage,
    CadastroPage,
    NovolocalPage,
    SugestoesPage,
    HomePage,
    SugerirPage,
    DetalheseventoPage

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDvXaxJqvlH_84DrxytYNF341Ax67H1OU8",
      libraries: ["places"]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjetoTCCBrendaPage,
    listaProxPage,
    CadastroPage,
    NovolocalPage,
    MapProxPage,
    SugerirPage,
    SugestoesPage,
    HomePage,
    DetalheseventoPage
  ],
  providers: [
    GoogleMaps,
    AngularFireDatabase,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Geolocation, //provider p geoloc nativo
    myService,
    Device
  ]
})
export class AppModule {





}