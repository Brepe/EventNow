import { Component,Injectable  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'Firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { key } from 'localforage';
import { ProviderProvider } from '../provider';
import { EditareventoPage } from '../editarevento/editarevento';


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
  authid ;
  use: Observable<firebase.User>; //para o auth firebase ngif
  meventos: FirebaseListObservable<any[]>;//para exibir e cadastrar
  filteredItems: Array<any> =[];
  contacts: Observable<any>;

  constructor(private provider: ProviderProvider,public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, 
    public afauth: AngularFireAuth, private toast: ToastController) {
    this.use = afauth.authState; //para o auth firebase ngif
    this.meventos = this.db.list('/eventos');//para exibir e cadastrar
    this.use.subscribe(result => this.authid = result.email);
    this.contacts = this.provider.getAll();

    //console.log(this.authid);
  }
  
  ionViewWillLoad() {

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
  editContact(contact: any) {
    // Maneira 1
    this.navCtrl.push(EditareventoPage, { contact: contact });
 
    // Maneira 2
     //this.navCtrl.push('EditareventoPage', { key: contact.key });
  }
  getFilteredItems() {
    this.filteredItems = [];
    this.meventos.forEach(element => {

      for (let i in element) {
        if (element[i].authid == this.authid ) {
          this.filteredItems.push(element[i]);

        }              

      }
    });    

  }

  remove(item: any) {
    return this.db.list('eventos/').remove(item);
  }
  removeContact(item: any) {
    if (item) {
      console.log("ifkey");
      this.remove(item)
        .then(() => {
          this.getFilteredItems();
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
          

          console.log("remove");

        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }
}
