import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { MapProxPage } from '../Map-prox/Map-prox';
import { HomePage } from '../home/home';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { Novoevento2Page } from '../novoevento2/novoevento2';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable'; //para o auth firebase ngif
import * as firebase from 'Firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@IonicPage()
@Component({
  selector: 'page-sugestoes',
  templateUrl: 'sugestoes.html',
})
export class SugestoesPage {
  sugestoes:FirebaseListObservable<any[]>;//para exibir e cadastrar
  use: Observable<firebase.User>; //para o auth firebase ngif

  constructor(public db: AngularFireDatabase,
     public navCtrl: NavController, public afauth: AngularFireAuth) {

    this.sugestoes = this.db.list('/sugestoes');//para exibir e cadastrar
    console.log(this.sugestoes);

    this.use = afauth.authState; //para o auth firebase ngif

  }
  ionViewWillLoad(){
    this.afauth.authState.subscribe(data => console.log(data)
  );
  firebase.auth().onAuthStateChanged(function(use) {
    if (use) {
      console.log(" User is signed in.");
    } else {
      console.log("No user is signed in.");
    }
  });
  }
  
  goToMapProxPage(params) {
    if (!params) params = {};
    this.navCtrl.push(MapProxPage);
  } goToHome(params) {
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  } goTolistaProx(params) {
    if (!params) params = {};
    this.navCtrl.push(listaProxPage);
  } goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  } goToNovoevento2(params) {
    if (!params) params = {};
    this.navCtrl.push(Novoevento2Page);
  }
}
