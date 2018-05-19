import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapProxPage } from '../Map-prox/Map-prox';
import { NovolocalPage } from '../novolocal/novolocal';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { User } from '../../app/providers/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //<<<<por causa do erro do ngmodule nos cadastros
import { CommonModule } from '@angular/common'; //<<<<por causa do erro do ngmodule nos cadastros
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'page-projeto-tccbrenda',
  templateUrl: 'projeto-tccbrenda.html'
})
export class ProjetoTCCBrendaPage {

  use = {} as User;

  constructor(public navCtrl: NavController, public afauth: AngularFireAuth) {
  }
  ngOnInit() {
    this.use = {} as User;
  }
  async login(use: User){
    try{
    const result = this.afauth.auth.signInAndRetrieveDataWithEmailAndPassword(use.email, use.password);
    if (result){
    this.navCtrl.push(MapProxPage);
    alert("a");
    }
    }catch(e){
      console.error(e);
    }
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
