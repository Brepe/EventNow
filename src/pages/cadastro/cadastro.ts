import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
//import { DetalhesEMapaPage } from '../detalhes-emapa/detalhes-emapa';

import { NovoPage } from '../novo/novo';
import { ListaDeObjetosPage } from '../lista-de-objetos/lista-de-objetos';
import { FirebaseListObservable, AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { Http } from '@angular/http';
export class User{
  id: string;
  nome: string;
  senha: string;
  email: string
}

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  listas: FirebaseListObservable<any>;
  user: User;

  public feeds: Array<string>;
  private url: string = "https://www.reddit.com/new.json"; 

  constructor( public db: AngularFireDatabase, public af: AngularFireModule,public navCtrl: NavController, public navParams: NavParams,  public http: Http) {
    this.listas = this.db.list('/lista');
    this.user = new User();
  
}

cadastrar(){
  this.listas.push(this.user).then(() => {
    this.user = new User();
  });
}

 goToDetalhesEMapa(params){
    if (!params) params = {};
 //   this.navCtrl.push(DetalhesEMapaPage);
  }goToProjetoTCCBrenda(params){
    if (!params) params = {};
    this.navCtrl.push(ProjetoTCCBrendaPage);
  }goToNovo(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPage);
  }goToListaDeObjetos(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDeObjetosPage);
  }goToCadastro(params){
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  }
}
