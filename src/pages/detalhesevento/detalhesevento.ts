import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the DetalheseventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


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
  toppings: string = "a";
  uf: string = "a";
  event: string = "a";
  description: string = "a";
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.roomkey = this.navParams.get("idk") as string;

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
      this.toppings = snapshot.val().toppings;
      this.uf = snapshot.val().uf;
    });
  }

  ionViewDidLoad() {

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
