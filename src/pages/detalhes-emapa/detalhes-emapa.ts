import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google;

/**
 * Generated class for the DetalhesEmapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'detalhes-emapa-page',
  templateUrl: 'detalhes-emapa.html',
})
export class DetalhesEmapaPage {
//Criar um viewchild para o elemento da div poder ser visto aqui e não dar o erro de falta de first child. Ref 
@ViewChild('map') mapElement: ElementRef;
//declarar map para que seja reconhecido (esse map é o #map do html)
map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
    //Colocar o que tem que ser mostrado na tela nessa função
    ionViewDidLoad(){ this.loadMap(); }


    loadMap(){
      let myLatlng = new google.maps.LatLng(-8.0631495, -34.87131120000004);
      let mapOptions = {
        center: myLatlng,
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    }

}
