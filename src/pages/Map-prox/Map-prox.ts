import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //plugin nativo cordova instalado via npm 
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { DetalheseventoPage } from '../detalhesevento/detalhesevento';

import * as firebase from 'Firebase';
import { Device } from '@ionic-native/device';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions
} from '@ionic-native/google-maps';

import { HomePage } from '../home/home';
import { myService } from '../services/data.service';
import { Profile } from '../../app/providers/profile';


declare var google;


@Component({
  selector: 'Map-prox-page',
  templateUrl: 'Map-prox.html',
})
export class MapProxPage {


  eventos: FirebaseListObservable<any[]>; //para exibir e cadastrar

  markers = [];

  map: GoogleMap;
  position: any = {};
profile ={} as Profile;
  // position: any;
  //Criar um viewchild para o elemento da div poder ser visto aqui e não dar o erro de falta de first child. Ref 
  @ViewChild('map') mapContainer: ElementRef;
  //declarar map para que seja reconhecido (esse map é o #map do html)
  //map: any;

  ref = firebase.database().ref('eventos/');  //ref do bd pra buscar as latlng



  constructor (private _myService: myService, public platform: Platform, private device: Device, public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private googleMaps: GoogleMaps, public zone: NgZone) {
    (window as any).angularComponent = { GoDetail: this.GoDetail, zone: zone };
    platform.ready().then(() => {// chama a função principal
      this.displayGoogleMap();
      //this.getMarkers();    

    });

    this.ref.on('value', resp => {
      snapshotToArray(resp).forEach(data => {//chama cada dado que foi passado de json para array
        let lat = parseFloat(data.lat);
        let lng = parseFloat(data.lng);
        let ender = data.endereco;
        let tudo = data.key;
        let evento = data.event;

        let image = 'assets/img/point.png';
        let updatelocation = new google.maps.LatLng(lat, lng);
        this.addMarker(updatelocation, image, ender, tudo, evento); //adiciona latlng de cada um e a img de ponto
        this.setMapOnAll(this.map); //coloca para exibir tudo no mapa
      });
    });

  }


  GoDetail = (idk: any) => {
    this.zone.run(() => { //Navigate To New Page 
      this.navCtrl.push(DetalheseventoPage,{idk});
      
    });
  }


  displayGoogleMap() {

    this.geolocation.getCurrentPosition()//aqui pra pegar loc atual
      .then((resp) => {
        let mypos = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        let mapOptions = {//opções da visualização do mapa
          zoom: 18,
          center: mypos,
          mapTypeId: google.maps.MapTypeId.ROADMAP

        }
        this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);



      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });

  }


  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  /*getMarkers() { // array com os markers
    for (let _i = 0; _i < this.markers.length; _i++) {
      if (_i > 0)
        this.addMarkersToMap(this.markers[_i]); //carrega cada markers nessa função


    }
  }*/


  addMarker(location, image, ender, tudo, evento) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });

    this.markers.push(marker);
    var endere = ender;
    // Parâmetros do texto que será exibido no clique; 
    var contentString = '<h3>'+ evento+'</h3><br>' + endere + 
    "<br><button onclick=\"window.angularComponent.GoDetail('" + tudo + "')\" >Detalhes</button>";



    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 100,
      maxHeight: 100

    });
    // Exibir texto ao clicar no ícone;
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(this.map, marker);
    });

  }

  /*/addMarkersToMap(markers) { //para carregar um marker no mapa
    var position = new google.maps.LatLng(markers.lat, markers.lng);
    var markersMarker = new google.maps.Marker({ position: position, title: markers.name });
    markersMarker.setMap(this.map);
  }*/



  // this.eventos = this.db.list('/eventos');//para exibir e cadastrar

} //fecha classe

export const snapshotToArray = snapshot => {//func para converter de json do bd para array
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};


/*
addMarkerToMap(mapElement, infowindow,lat, lng) {
var marker = new google.maps.Marker({
position: new google.maps.LatLng(lat, lng),
map: mapElement
});
}
//Colocar o que tem que ser mostrado na tela nessa função
ionViewDidLoad() {
  //aqui pra pegar loc atual
  this.geolocation.getCurrentPosition()
    .then((resp) => {
      const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      const mapOptions = {
        zoom: 18,
        center: position
      }
      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
      var exx = this.db.list('/eventos/Eventotestes/lat');
      var exy='-43.689167';
      this.addMarkerToMap(this.map, infowindow,exx, exy);
      const marker = new google.maps.Marker({
        position: position,
        map: this.map
      });
      // Parâmetros do texto que será exibido no clique;
      var contentString = '<h2>Marco Zero</h2>' +
        '<p>Praça Rio Branco, Recife/PE.</p>' +
        '<a href="http://pt.wikipedia.org/wiki/Pra%C3%A7a_Rio_Branco_(Recife)" target="_blank">clique aqui para mais informações</a>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 700
      });
      // Exibir texto ao clicar no ícone;
      google.maps.event.addListener(marker, 'click', function () {
        infowindow.open(this.map, marker);
      });
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição', error);
    });
}

//}*/