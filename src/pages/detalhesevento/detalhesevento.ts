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
  roomkey:string;
  chats = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {  
    this.roomkey = this.navParams.get("idk") as string;

     firebase.database().ref('eventos/'+this.roomkey).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);

    });
  }

  ionViewDidLoad() {
    console.log(this.chats);
  }

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
