import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapProxPage } from '../Map-prox/Map-prox';
import { NovolocalPage } from '../novolocal/novolocal';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-projeto-tccbrenda',
  templateUrl: 'projeto-tccbrenda.html'
})
export class ProjetoTCCBrendaPage {

  constructor(public navCtrl: NavController) {
  }

  goToNovolocal(params){
    if (!params) params = {};
    this.navCtrl.push(NovolocalPage);
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
  goToProjetoTCCBrenda(params){
    if (!params) params = {};
    this.navCtrl.push(ProjetoTCCBrendaPage);
  }
}
