import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MapProxPage } from '../Map-prox/Map-prox';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { NovolocalPage } from '../novolocal/novolocal';
import { SugestoesPage } from '../sugestoes/sugestoes';
import {AngularFireList  } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';


export class Sugerir {//para cadastrar
  id:string;
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
  sugerir: Sugerir; //para cadastrar
  sugestoes:FirebaseListObservable<any[]>;//para exibir e cadastrar



  public event = {
    month: '10-05-2018',
    timeStarts: '09:00',
    timeEnds: '10-05-2018'
  }
  constructor( public db: AngularFireDatabase, public navCtrl: NavController) {
    this.sugestoes = this.db.list('/sugestoes');//para exibir e cadastrar

    this.sugerir = new Sugerir();//para cadastrar

  }



  cadastrar(){//para cadastrar
    this.sugestoes.push(this.sugerir).then(() => {
      this.sugerir = new Sugerir();
      });
      alert("Salvo!");
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
/*@Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: 'dialog-data-example-dialog.html',
})
export class DialogDataExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}*/