import { Component , Output, EventEmitter} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapProxPage } from '../Map-prox/Map-prox';
import { HomePage } from '../home/home';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { Novoevento2Page } from '../novoevento2/novoevento2';
import {AngularFireList  } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable'; //para o auth firebase ngif
import * as firebase from 'Firebase';


@IonicPage()
@Component({
  selector: 'page-sugestoes',
  templateUrl: 'sugestoes.html',
})
export class SugestoesPage {
  sugestoes:FirebaseListObservable<any[]>;//para exibir e cadastrar
  use: Observable<firebase.User>; //para o auth firebase ngif

  constructor(public db: AngularFireDatabase,
     public navCtrl: NavController) {

    this.sugestoes = this.db.list('/sugestoes');//para exibir e cadastrar
    console.log(this.sugestoes);


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
