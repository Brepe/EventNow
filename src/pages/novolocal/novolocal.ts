import { NavController } from 'ionic-angular';
import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MapProxPage } from '../Map-prox/Map-prox';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { myService } from '../services/data.service';
import {SugerirPage} from '../sugerir/sugerir';
import { AngularFireList } from 'angularfire2/database';
import {
    AngularFireDatabase,
    FirebaseObjectObservable,
    FirebaseListObservable
} from 'angularfire2/database-deprecated';


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
  event:string;

}

@Component({
  selector: 'page-novolocal',
  templateUrl: 'novolocal.html'
})



export class NovolocalPage {

  public lat: number;
  public lng: number;
  public endereco: string;
  lista: Listar; //para cadastrar
  listas: FirebaseListObservable<any[]>;//para exibir e cadastrar

public example: string;

  constructor(private database: AngularFireDatabase,public navCtrl: NavController,private _myService: myService) {    
    console.log(this._myService.getData());
    console.log(this._myService.getDatalat());
    console.log(this._myService.getDatalon());
/* this.endereco = this._myService.getData();
 this.lat = this._myService.getDatalat();
 this.lng = this._myService.getDatalon();*/

    this.listas = this.database.list('/eventos');
  this.lista = new Listar();//para cadastrar


  }
  /*submitForm(endereco: string, lat: number, lng: number) {

    var newAlbum: Lista = new Lista(this.endereco, this.lat, this.lng);
    this.listas.push(newAlbum);
    console.log(endereco);
    console.log(newAlbum);

}*/
cadastrar() {//para cadastrar
  this.listas.push(this.lista).then(() => {
  //  this.lista = new Lista();
     console.log(this.lista);
  });
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
  }goToNovolocal(params){
    if (!params) params = {};
    this.navCtrl.push(NovolocalPage);
  }
}
