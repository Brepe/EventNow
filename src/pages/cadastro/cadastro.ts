import { Component, Injectable } from '@angular/core';
import { NavController, NavParams,ToastController  } from 'ionic-angular';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
//import { MapProxPagePage } from '../Map-prox/Map-prox';

import { NovolocalPage } from '../novolocal/novolocal';
import { listaProxPage } from '../lista-prox/lista-prox';
import {  AngularFireDatabaseModule } from "angularfire2/database";
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { Http } from '@angular/http';
import { MapProxPage } from '../Map-prox/Map-prox';
import { SugerirPage } from '../sugerir/sugerir';
import { SugestoesPage } from '../sugestoes/sugestoes';

export class User{//para cadastrar
  id: string;
  nome: string;
  senha: string;
  email: string
}
@Injectable()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  user: User; //para cadastrar
  usuario:FirebaseListObservable<any[]>;//para exibir e cadastrar
  
  //public feeds: Array<string>;
  //private url: string = "https://www.reddit.com/new.json"; 
  constructor(private toastCtrl: ToastController, 
    public db: AngularFireDatabase, 
    public af: AngularFireModule,public navCtrl: NavController, 
    public navParams: NavParams,  public http: Http) {
   this.usuario = this.db.list('/usuario');//para exibir e cadastrar
   this.user = new User();//para cadastrar
}

cadastrar(){//para cadastrar
  this.usuario.push(this.user).then(() => {
    this.user = new User();
  });
  this.presentToast();
}

presentToast() {
  let toast = this.toastCtrl.create({
    message: 'Usuário foi adicionado',
    duration: 3000,
    position: 'top'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}

goToMapProxPage(params){
  if (!params) params = {};
this.navCtrl.push(MapProxPage);
}goToProjetoTCCBrenda(params){
  if (!params) params = {};
  this.navCtrl.push(ProjetoTCCBrendaPage);
}goTolistaProx(params){
  if (!params) params = {};
  this.navCtrl.push(listaProxPage);
}goToCadastro(params){
  if (!params) params = {};
  this.navCtrl.push(CadastroPage);
}goToSugerir(params){
  if (!params) params = {};
  this.navCtrl.push(SugerirPage);
}goToSugestoes(params){
  if (!params) params = {};
  this.navCtrl.push(SugestoesPage);
}
}
