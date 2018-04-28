import { Component } from '@angular/core';
import { IonicPage, NavController/*, NavParams*/ } from 'ionic-angular';
import { MapProxPage } from '../Map-prox/Map-prox';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
//import { NovolocalPage } from '../novolocal/novolocal';
import { SugestoesPage } from '../sugestoes/sugestoes';
//import { AngularFireList } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';



export class FormSugerir {//para cadastrar
  id: string;
  cidade: string;
  melhordia: string;
  melhorhora: string;
  pub: string;
  tipo: string;
  uf: string;
  valor: string;

}

@IonicPage()
@Component({
  selector: 'page-sugerir',
  templateUrl: 'sugerir.html',
})
export class SugerirPage {
  sugerirform: FormSugerir; //para cadastrar
  sugestoesform: FirebaseListObservable<any[]>;//para exibir e cadastrar


  constructor(public db: AngularFireDatabase, public navCtrl: NavController) {
    this.sugestoesform = this.db.list('/sugestoes');//para exibir e cadastrar

    this.sugerirform = new FormSugerir();//para cadastrar

  }



  cadastrar() {//para cadastrar
    this.sugestoesform.push(this.sugerirform).then(() => {
   // this.sugerirform = new FormSugerir();
   console.log(this.sugerirform);
    });
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
  } goToSugerir(params) {
    if (!params) params = {};
    this.navCtrl.push(SugerirPage);
  } goToSugestoes(params) {
    if (!params) params = {};
    this.navCtrl.push(SugestoesPage);
  }
}
