import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetalhesEmapaPage } from '../detalhes-emapa/detalhes-emapa';
import { CadastroPage } from '../cadastro/cadastro';
import { ProjetoTCCBrendaPage } from '../projeto-tccbrenda/projeto-tccbrenda';
import { NovoPage } from '../novo/novo';

@Component({
  selector: 'page-lista-de-objetos',
  templateUrl: 'lista-de-objetos.html'
})
export class ListaDeObjetosPage {

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
