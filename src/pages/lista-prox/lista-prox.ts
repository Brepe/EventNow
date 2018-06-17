import { Component } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
// import { Device } from '@ionic-native/device';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';


@Component({
  selector: 'page-lista-prox',
  templateUrl: 'lista-prox.html'
})
export class listaProxPage {
  authid ;
  use: Observable<firebase.User>; //para o auth firebase ngif
  meventos: FirebaseListObservable<any[]>;//para exibir e cadastrar
  filteredItems: Array<any> =[];
  d = new Date();
  showMe=false;



  constructor(public db: AngularFireDatabase, public navParams: NavParams,public navCtrl: NavController,
    public platform: Platform,    public afauth: AngularFireAuth) {
      this.use = afauth.authState; //para o auth firebase ngif
      this.meventos = this.db.list('/eventos');//para exibir e cadastrar


    }
    show() {
      this.showMe = true;
    }

    ionViewWillLoad() {
      this.showMe=false;


      this.afauth.authState.subscribe(data => console.log(data)    );
  
      firebase.auth().onAuthStateChanged(function (use) {
        if (use) {
          console.log(" User is signed in.");
        } else {
          console.log("No user is signed in.");
        }
      });
      this.getFilteredItems();
    }
    getFilteredItems() {
      var strData =
      this.d.getFullYear() + "-" +
      ("00" + (this.d.getMonth() + 1)).slice(-2) + "-" +
      ("00" + (this.d.getDate() - 1)).slice(-2);

      this.filteredItems = [];

      this.meventos.forEach(element => {
  
        for (let i in element) {
          if (element[i].dayEnds >= strData) {
            this.filteredItems.push(element[i]);
  
          }              
  
        }
      });    
  
    }
  }

