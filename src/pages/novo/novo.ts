import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DetalhesEmapaPage } from '../detalhes-emapa/detalhes-emapa';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { ListaDeObjetosPage } from '../lista-de-objetos/lista-de-objetos';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-novo',
  templateUrl: 'novo.html'
})

export class NovoPage {

  public event = {
    month: '10-05-2018',
    timeStarts: '09:00',
    timeEnds: '10-05-2018'
  }
  constructor(public navCtrl: NavController) {
  }
  goToDetalhesEMapa(params){
    if (!params) params = {};
this.navCtrl.push(DetalhesEmapaPage);
  }goToProjetoTCCBrenda(params){
    if (!params) params = {};
    this.navCtrl.push(ProjetoTCCBrendaPage);
  }goToListaDeObjetos(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDeObjetosPage);
  }goToCadastro(params){
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  }goToNovo(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPage);
  }
}
