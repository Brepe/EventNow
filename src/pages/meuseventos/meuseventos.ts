import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'Firebase';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the MeuseventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meuseventos',
  templateUrl: 'meuseventos.html',
})
export class MeuseventosPage {
  use: Observable<firebase.User>; //para o auth firebase ngif

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public afauth: AngularFireAuth) {
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

}
