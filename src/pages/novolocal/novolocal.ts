import { NavController } from 'ionic-angular';
import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';

import { MapProxPage } from '../Map-prox/Map-prox';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-novolocal',
  templateUrl: 'novolocal.html'
})

export class NovolocalPage {

  public event = {
    month: '10-05-2018',
    timeStarts: '09:00',
    timeEnds: '10-05-2018'
  }
  constructor(public navCtrl: NavController) {
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
