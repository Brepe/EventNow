import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { Userclass } from '../../app/providers/user';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //<<<<por causa do erro do ngmodule nos cadastros
import { CommonModule } from '@angular/common'; //<<<<por causa do erro do ngmodule nos cadastros
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable'; //para o auth firebase ngif
import * as firebase from 'Firebase';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario = {} as Userclass;
  use: Observable<firebase.User>; //para o auth firebase ngif
  usuariofire: FirebaseListObservable<any[]>;//para exibir e cadastrar
  usuariovar: string;
  private msgErro: any;

  constructor( private db: AngularFireDatabase, private alertCtrl: AlertController, public navCtrl: NavController, 
    public afauth: AngularFireAuth, public loadingCtrl: LoadingController) {
    this.use = afauth.authState; //para o auth firebase ngif
    this.usuariofire =  this.db.list('/usuario');//para exibir e cadastrar

  }

  logout() {
    return this.afauth.auth.signOut();

  }

  ngOnInit() {

    try {
      this.load();
      this.usuario = {} as Userclass;

      firebase.auth().onAuthStateChanged(function (use) {
        if (use) {
          console.log(" User is signed in.");

        } else {
          console.log("No user is signed in.");
        }
      });
    } catch (e) {
      this.navCtrl.setRoot(HomePage);
      console.log(e);
    }
  }
  load() {
    let loading = this.loadingCtrl.create({
      spinner: 'dots'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
  }

  async login(usuario: Userclass) {
    try {
      this.afauth.auth.signInAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.password)
        .then(user => {
          const result = this.afauth.auth.signInAndRetrieveDataWithEmailAndPassword(usuario.email, usuario.password);
          if (result) {
            console.log(result);
            this.navCtrl.setRoot(HomePage);
          }

        }, error => {
          let alert = this.alertCtrl.create({
            title: 'Usuário e/ou senha incorretos.',
            buttons: ['OK']
          });
          alert.present();
        })
    } catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Digite login e senha.',
        buttons: ['OK']
      });
      alert.present();
      console.error(e);
    }
  }
  goToCadastro(){
    this.navCtrl.setRoot(CadastroPage);

  }


}
