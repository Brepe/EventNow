import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { DetalhesEMapaPage } from '../detalhes-emapa/detalhes-emapa';
import { NovoPage } from '../novo/novo';
import { ListaDeObjetosPage } from '../lista-de-objetos/lista-de-objetos';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-projeto-tccbrenda',
  templateUrl: 'projeto-tccbrenda.html'
})
export class ProjetoTCCBrendaPage {

  constructor(public navCtrl: NavController) {
  }
  goToDetalhesEMapa(params){
    if (!params) params = {};
 //   this.navCtrl.push(DetalhesEMapaPage);
  }goToNovo(params){
    if (!params) params = {};
    this.navCtrl.push(NovoPage);
  }goToListaDeObjetos(params){
    if (!params) params = {};
    this.navCtrl.push(ListaDeObjetosPage);
  }goToCadastro(params){
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  }goToProjetoTCCBrenda(params){
    if (!params) params = {};
    this.navCtrl.push(ProjetoTCCBrendaPage);
  }
}
