import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapProxPage } from '../Map-prox/Map-prox';
import { Novoevento2Page } from '../novoevento2/novoevento2';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import {  Userclass } from '../../app/providers/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //<<<<por causa do erro do ngmodule nos cadastros
import { CommonModule } from '@angular/common'; //<<<<por causa do erro do ngmodule nos cadastros
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { SugerirPage } from '../sugerir/sugerir';
import { Observable } from 'rxjs/Observable'; //para o auth firebase ngif
import * as firebase from 'Firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario = {} as Userclass;
  use: Observable<firebase.User>; //para o auth firebase ngif

  constructor(public navCtrl: NavController, public afauth: AngularFireAuth) {
    this.use = afauth.authState; //para o auth firebase ngif

  }
  
  logout() {
    return this.afauth.auth.signOut();
    
  }

  ngOnInit() {
    this.usuario = {} as Userclass;

    firebase.auth().onAuthStateChanged(function(use) {
      if (use) {
        console.log(" User is signed in.");
      } else {
        console.log("No user is signed in.");
      }
    });
  }

  // ionViewWillLoad(){

  // }

  async login(usuario: Userclass){
    try{
    const result = this.afauth.auth.signInAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.password);
    if (result){
    this.navCtrl.push(SugerirPage);
    alert("a");
    }
    }catch(e){
      console.error(e);
    }
  }
  goToNovoevento2(params){
    if (!params) params = {};
    this.navCtrl.push(Novoevento2Page);
  }
  goToMapProx(params){
    if (!params) params = {};
   this.navCtrl.push(MapProxPage);
   console.log(params);
  }
  
  goTolistaProx(params){
    if (!params) params = {};
    this.navCtrl.push(listaProxPage);
  }
  goToCadastro(params){
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  }
  goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }
}
