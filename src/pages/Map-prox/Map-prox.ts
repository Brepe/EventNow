import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //plugin nativo cordova instalado via npm 
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseListObservable } from 'angularfire2/database-deprecated';
import { DetalheseventoPage } from '../detalhesevento/detalhesevento';
import * as firebase from 'Firebase';
// import { Device } from '@ionic-native/device';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions
} from '@ionic-native/google-maps';
import { myService } from '../services/data.service';
import { Profile } from '../../app/providers/profile';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

declare var google;

@Component({
  selector: 'Map-prox-page',
  templateUrl: 'Map-prox.html',
})
export class MapProxPage {

  use: Observable<firebase.User>; //para o auth firebase ngif
  eventos: FirebaseListObservable<any[]>; //para exibir e cadastrar
  markers = [];
  map: GoogleMap;
  position: any = {};
  profile = {} as Profile;

  //Criar um viewchild para o elemento da div poder ser visto aqui e não dar o erro de falta de first child. Ref 
  @ViewChild('map') mapContainer: ElementRef;
  //declarar map para que seja reconhecido (esse map é o #map do html)

 d = new Date();
  

  ref = firebase.database().ref('eventos/');  //ref do bd pra buscar as latlng
  initialMapLoad: boolean = true; //para recarregar o map toda vez q abrir, e mostrar os markers

  constructor(public platform: Platform,  public db: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation,
    private googleMaps: GoogleMaps, public zone: NgZone, public afauth: AngularFireAuth) {

    (window as any).angularComponent = { GoDetail: this.GoDetail, zone: zone };
    this.use = afauth.authState; //para o auth firebase ngif

  }

  ionViewWillEnter() {

    this.displayGoogleMap();
  }

  displayGoogleMap() {

    this.geolocation.getCurrentPosition()//aqui pra pegar loc atual
      .then((resp) => {
        let mypos = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        console.log(resp);
        let mapOptions = {//opções da visualização do mapa
          zoom: 15,
          center: mypos,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false

        }
        this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);

        this.PutjsonInMap(); //deixei essa função aqui para o mapa carregar os markers toda vez que eu entrar, não só na primeira

      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  PutjsonInMap() {
    this.ref.on('value', resp => {
      snapshotToArray(resp).forEach(data => {//chama cada dado que foi passado de json para array
        let lat = parseFloat(data.lat);
        let lng = parseFloat(data.lng);
        let ender = data.endereco;
        let tudo = data.key;
        let evento = data.event;
        let top = data.toppings;
        let dayEnds =data.dayEnds;
        let dayStarts =data.month;

        var strData =
        this.d.getFullYear() + "-" +
        ("00" + (this.d.getMonth() + 1)).slice(-2) + "-" +
        ("00" + this.d.getDate()).slice(-2);



        let image;
        
        if (top=="Festa"){
          image = 'assets/img/party.png';
        } else if (top=="Feira"){
          image = 'assets/img/feira.png';
        } else if (top=="Praia"){
          image = 'assets/img/beach.png';
        } else if (top=="Show"){
          image = 'assets/img/show.png';
        } else if (top=="Evento cultural"){
          image = 'assets/img/cult.png';
        } else if (top=="Outros"){
          image = 'assets/img/other.png';
        } else{
          image = 'assets/img/err.png';
        }
        
        let updatelocation = new google.maps.LatLng(lat, lng);
        if ((dayEnds>=strData) && (dayStarts<=strData)){
        this.addMarker(updatelocation, image, ender, tudo, evento); }//adiciona latlng de cada um e a img de ponto
        this.setMapOnAll(this.map); //coloca para exibir tudo no mapa
      });
    });
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  addMarker(location, image, ender, tudo, evento) {
    console.log("passando por addmarker")
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });

    this.markers.push(marker);
    var endere = ender;
    // Parâmetros do texto que será exibido no clique ---------------------------------------------
    var contentString = '<div id="google-popup"><h5>' + evento + '</h5><span  style="font-size:3vw">' + endere +
      "</span><br><button onclick=\"window.angularComponent.GoDetail('" + tudo + "')\" >Detalhes</button> </div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 150,
      maxHeight: 150
    });

    // Exibir texto ao clicar no ícone ----------------------------
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.open(this.map, marker);
      
    });
  }

  ionViewWillLoad() {
    this.afauth.authState.subscribe(data => console.log(data)
    );
    firebase.auth().onAuthStateChanged(function (use) {
      if (use) {
        console.log(" User is signed in.");
      } else {
        console.log("No user is signed in.");
      }
    });
  }


  GoDetail = (idk: any) => {
    this.zone.run(() => { //Navigate To New Page 
      this.navCtrl.setRoot(DetalheseventoPage, { idk });
    });
  }

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

