import { Component, Injectable } from '@angular/core';
import { NavController, NavParams,ToastController  } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { MapProxPagePage } from '../Map-prox/Map-prox';

import { Novoevento2Page } from '../novoevento2/novoevento2';
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
import { Userclass } from '../../app/providers/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //<<<<por causa do erro do ngmodule nos cadastros
import { CommonModule } from '@angular/common'; //<<<<por causa do erro do ngmodule nos cadastros

export class User1{//para cadastrar
  id: string;
  login: string;
  password: string;
  email: string
}
@Injectable()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  use = {} as Userclass;

  user: User1; //para cadastrar
  usuario:FirebaseListObservable<any[]>;//para exibir e cadastrar
  
  //public feeds: Array<string>;
  //private url: string = "https://www.reddit.com/new.json"; 
  constructor(private toastCtrl: ToastController, 
    public afauth: AngularFireAuth,
    public db: AngularFireDatabase, 
    public af: AngularFireModule,public navCtrl: NavController, 
    public navParams: NavParams,  public http: Http) {
   this.usuario = this.db.list('/usuario');//para exibir e cadastrar
   this.use = new User1();//para cadastrar
}
ngOnInit() {
  this.use = {} as Userclass;
}
async cadastrar(use: Userclass){//para cadastrar

  try{
  const result = await this.afauth.auth.createUserAndRetrieveDataWithEmailAndPassword(use.email, use.password);
  console.log(result);

  this.usuario.push(this.use).then(() => {
    this.use = new User1();

  });
  this.presentToast();
  }catch(e){
  console.log(e);
  }
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
}goToHome(params){
  if (!params) params = {};
  this.navCtrl.push(HomePage);
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
