import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
// import { AngularFireDatabase } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Userclass } from '../../app/providers/user';

@IonicPage()
@Component({
  selector: 'page-detalhesevento',
  templateUrl: 'detalhesevento.html',
})
export class DetalheseventoPage {
  roomkey: string;
  endereco: string = "a";
  lat: string = "a";
  lng: string = "a";
  month: string = "a";
  dayEnds: string = "a";
  timeStarts: string = "a";
  timeEnds: string = "a";

  toppings: string = "a";
  uf: string = "a";
  event: string = "a";
  description: string = "a";

  form: FormGroup;
  ev: any;

  usuario = {} as Userclass;

  use: Observable<firebase.User>; //para o auth firebase ngif
  meventos: FirebaseListObservable<any[]>;//para exibir e cadastrar
  usuariofire: FirebaseListObservable<any[]>;//para exibir e cadastrar

  filteredItems: Array<any> =[];
  contacts: Observable<any>;

  constructor( public afauth: AngularFireAuth, private formBuilder: FormBuilder, private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.roomkey = this.navParams.get("idk") as string;
    this.use = afauth.authState; //para o auth firebase ngif

    this.ev = this.navParams.data.ev || { };
    this.createForm();
    this.usuariofire =  this.db.list('/usuario');//para exibir e cadastrar
    this.meventos = this.db.list('/coments');//para exibir e cadastrar

    firebase.database().ref('eventos/' + this.roomkey).on('value', snapshot => {

      this.event = snapshot.val().event;
      console.log(this.event);
      this.description = snapshot.val().description;
      console.log(this.description);
      this.endereco = snapshot.val().endereco;
      this.lat = snapshot.val().lat;
      this.lng = snapshot.val().lng;
      this.month = snapshot.val().month;
      this.dayEnds = snapshot.val().dayEnds;
      this.timeStarts = snapshot.val().timeStarts;
      this.timeEnds = snapshot.val().timeEnds;

      this.toppings = snapshot.val().toppings;
      this.uf = snapshot.val().uf;
    });
    this.getFilteredItems();

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
  }


  getFilteredItems() {
    this.filteredItems = [];
    this.meventos.forEach(element => {
      console.log(element);
      for (let i in element) {
        if (element[i].key == this.roomkey) {
          this.filteredItems.push(element[i]);

        }              

      }
    });    

  }
  createForm() {
    this.form = this.formBuilder.group({
      key: [this.ev.$key],
      comentarios: [this.ev.comentarios],
      user: [this.ev.user],
      name: [this.ev.name],



    });
  }

add(ev: any) {
  return new Promise((resolve, reject) => {
    console.log(ev);
      
          console.log("nou");
          this.db.list('coments/')
            .push({key: ev.key, comentarios: ev.comentarios,user: ev.user, name: ev.name })
            .then(() => resolve());
    
  })
}
onSubmit() {
  if (this.form.valid) {
    var idk = this.roomkey
    this.add(this.form.value)
      .then(() => {
        this.navCtrl.setRoot(DetalheseventoPage, { idk });
      })
      .catch((e) => {
        console.error(e);
      })
  }
}

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(Snapshot => {
    let item = Snapshot.val();
    item.key = Snapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};
