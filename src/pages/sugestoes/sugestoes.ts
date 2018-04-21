import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapProxPage } from '../Map-prox/Map-prox';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { NovolocalPage } from '../novolocal/novolocal';
import {AngularFireList  } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';


@IonicPage()
@Component({
  selector: 'page-sugestoes',
  templateUrl: 'sugestoes.html',
})
export class SugestoesPage {
  sugestoes:FirebaseListObservable<any[]>;//para exibir e cadastrar



  constructor(public db: AngularFireDatabase,
     public navCtrl: NavController) {

    this.sugestoes = this.db.list('/sugestoes');//para exibir e cadastrar
    console.log(this.sugestoes);


  }
  goToMapProxPage(params) {
    if (!params) params = {};
    this.navCtrl.push(MapProxPage);
  } goToProjetoTCCBrenda(params) {
    if (!params) params = {};
    this.navCtrl.push(ProjetoTCCBrendaPage);
  } goTolistaProx(params) {
    if (!params) params = {};
    this.navCtrl.push(listaProxPage);
  } goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  } goToNovolocal(params) {
    if (!params) params = {};
    this.navCtrl.push(NovolocalPage);
  }
}
