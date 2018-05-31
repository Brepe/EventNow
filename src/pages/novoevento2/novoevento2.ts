import { NavController } from 'ionic-angular';
import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MapProxPage } from '../Map-prox/Map-prox';
import { HomePage } from '../home/home';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { myService } from '../services/data.service';
import { SugerirPage } from '../sugerir/sugerir';
import { AngularFireList } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'Firebase';
import { Observable } from 'rxjs/Observable';


/*export class Lista {//para cadastrar

  constructor(public endereco: string, public lat: number, public lng: number, public uf: string) { }


}*/
export class Listar {//para cadastrar
  id: string;
  uf: string;
  endereco: string;
  lat: number;
  lng: number;
  toppings: string;
  timeStart: string;
  timeEnds: string;
  month: string;
  description: string;
  event: string;

}

@Component({
  selector: 'page-novoevento2',
  templateUrl: 'novoevento2.html'
})



export class Novoevento2Page {
  authid;
  use: Observable<firebase.User>; //para o auth firebase ngif
  public lat: number;
  public lng: number;
  public endereco: string;
  lista: Listar; //para cadastrar
  listas: FirebaseListObservable<any[]>;//para exibir e cadastrar

  public example: string;

  constructor(private database: AngularFireDatabase, public navCtrl: NavController,
    private _myService: myService, public afauth: AngularFireAuth) {
    console.log(this._myService.getData());
    console.log(this._myService.getDatalat());
    console.log(this._myService.getDatalon());

    this.use = afauth.authState; //para o auth firebase ngif
    this.use.subscribe(result => this.authid = result.email);

    this.listas = this.database.list('/eventos');
    this.lista = new Listar();//para cadastrar


  }
  /*submitForm(endereco: string, lat: number, lng: number) {

    var newAlbum: Lista = new Lista(this.endereco, this.lat, this.lng);
    this.listas.push(newAlbum);
    console.log(endereco);
    console.log(newAlbum);

}*/
  ionViewWillLoad() {
    this.afauth.authState.subscribe(data => console.log(data)
    );

    firebase.auth().onAuthStateChanged(function (use) {
      //this.authmail = use.email;
      if (use) {
        console.log(" User is signed in.");
      } else {
        console.log("No user is signed in.");
      }
    });
    //console.log(this.authmail);
  }
  cadastrar() {//para cadastrar
    this.listas.push(this.lista).then(() => {
      //  this.lista = new Lista();
      console.log(this.lista);
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
