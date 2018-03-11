import { NgModule, ErrorHandler,Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProjetoTCCBrendaPage } from '../pages/projeto-tccbrenda/projeto-tccbrenda';
import { ListaDeObjetosPage } from '../pages/lista-de-objetos/lista-de-objetos';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { NovoPage } from '../pages/novo/novo';
import { DetalhesEmapaPage } from '../pages/detalhes-emapa/detalhes-emapa';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';

//imports do firebase 4.0
import { FirebaseListObservable, AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

var config = {
  apiKey: "AIzaSyDvXaxJqvlH_84DrxytYNF341Ax67H1OU8",
  authDomain: "geoloc-179420.firebaseapp.com",
  databaseURL: "https://geoloc-179420.firebaseio.com",
  projectId: "geoloc-179420",
  storageBucket: "geoloc-179420.appspot.com",
  messagingSenderId: "241352714682"
};


@NgModule({
  declarations: [
    MyApp,
    ProjetoTCCBrendaPage,
    ListaDeObjetosPage,
DetalhesEmapaPage,
    CadastroPage,
    NovoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProjetoTCCBrendaPage,
    ListaDeObjetosPage,
    CadastroPage,
    NovoPage,
 DetalhesEmapaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}