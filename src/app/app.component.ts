import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { HomePage } from '../pages/home/home';
import { MapProxPage } from '../pages/Map-prox/Map-prox';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { listaProxPage } from '../pages/lista-prox/lista-prox';
import { Novoevento2Page } from '../pages/novoevento2/novoevento2';
import { SugerirPage } from '../pages/sugerir/sugerir';
import { SugestoesPage } from '../pages/sugestoes/sugestoes';
import * as firebase from 'Firebase';
import { NovoeventoPage } from '../pages/novoevento/novoevento';
import { DetalheseventoPage } from '../pages/detalhesevento/detalhesevento';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menu: MenuController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Cadastro', component: CadastroPage },
      { title: 'Novo evento', component: NovoeventoPage },
      { title: 'Mapear eventos', component: MapProxPage },
      { title: 'Listar eventos', component: listaProxPage },
      { title: 'Sugerir', component: SugerirPage },
      { title: 'Sugestões', component: SugestoesPage }
    ];


    platform.ready().then(() => {
      menu.enable(true);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
