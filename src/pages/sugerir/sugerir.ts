import { Component } from '@angular/core';
import { IonicPage, NavController,/*, NavParams*/ 
AlertController} from 'ionic-angular';
import { MapProxPage } from '../Map-prox/Map-prox';
import { HomePage } from '../home/home';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
//import { Novoevento2Page } from '../novoevento2/novoevento2';
import { SugestoesPage } from '../sugestoes/sugestoes';
//import { AngularFireList } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs/Observable'; //para o auth firebase ngif
import {  AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'Firebase';



export class FormSugerir {//para cadastrar
  id: string;
  cidade: string;
  melhordia: string;
  melhorhora: string;
  pub: string;
  tipo: string;
  uf: string;
  valor: string;
  detalhes: string;

}

@IonicPage()
@Component({
  selector: 'page-sugerir',
  templateUrl: 'sugerir.html',
})
export class SugerirPage {
  use: Observable<firebase.User>; //para o auth firebase ngif

  sugerirform: FormSugerir; //para cadastrar
  sugestoesform: FirebaseListObservable<any[]>;//para exibir e cadastrar


  constructor(public db: AngularFireDatabase, public navCtrl: NavController, public afauth: AngularFireAuth,
    private alertCtrl: AlertController,) {
    this.sugestoesform = this.db.list('/sugestoes');//para exibir e cadastrar

    this.sugerirform = new FormSugerir();//para cadastrar
    this.use = afauth.authState; //para o auth firebase ngif

  }
  ionViewWillLoad(){
    this.afauth.authState.subscribe(data => console.log(data)
  );
  firebase.auth().onAuthStateChanged(function(use) {
    if (use) {
      console.log(" User is signed in.");
    } else {
      console.log("No user is signed in.");
    }
  });
  }


  cadastrar() {//para cadastrar
    if (this.sugerirform.pub==undefined || this.sugerirform.melhorhora==undefined ||
      this.sugerirform.tipo==undefined ||  this.sugerirform.uf==undefined|| this.sugerirform.cidade==undefined || 
      this.sugerirform.melhordia==undefined){
      let alert = this.alertCtrl.create({
        title: 'Preencha os campos obrigatórios!',
        buttons: ['OK']
      });
      alert.present(); 
    }else{
    this.sugestoesform.push(this.sugerirform).then(() => {
   // this.sugerirform = new FormSugerir();
   let alert = this.alertCtrl.create({
    title: 'Salvo!',
    buttons: ['OK']
  });
  alert.present(); 
   console.log(this.sugerirform);
   this.navCtrl.push(SugestoesPage);
    });
  }
  }

  goToMapProxPage(params) {
    if (!params) params = {};
    this.navCtrl.push(MapProxPage);
  } goToHome(params) {
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  } goTolistaProx(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(listaProxPage);
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
