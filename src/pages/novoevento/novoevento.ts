import { NavController } from 'ionic-angular';
import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
//import {} from '@types/googlemaps';
import { AngularFireList } from 'angularfire2/database';
import {
    AngularFireDatabase,
    FirebaseObjectObservable,
    FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { myService } from '../services/data.service';

import { SugerirPage } from '../sugerir/sugerir';
import { Novoevento2Page } from '../novoevento2/novoevento2';



declare var google: any;

export class Lista {//para cadastrar

    constructor(public endereco: string, public latitude: number, public longitude: number) { }


}

@Component({
    selector: 'page-novoevento',
    templateUrl: 'novoevento.html'
})

export class NovoeventoPage {
    adressdata: string;
    latdata: number;
    londata: number;


    public latitude: number;
    public longitude: number;
    public searchControl: FormControl;
    public zoom: number;
    public endereco: string;
    lista: Lista; //para cadastrar
    listas: FirebaseListObservable<any[]>;//para exibir e cadastrar


    @ViewChild('search') public searchElementRef: ElementRef;

    constructor(private _myService: myService, private database: AngularFireDatabase, public navCtrl: NavController, private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        this.listas = database.list('/listas');
        console.log(this._myService.getData());
        console.log(this._myService.getDatalat());
        console.log(this._myService.getDatalon());




    }

    ionViewDidLoad() {
        //set google maps defaults
        this.zoom = 4;
        this.latitude = 39.8282;
        this.longitude = -98.5795;

        //create search FormControl
        this.searchControl = new FormControl();

        //set current position
        this.setCurrentPosition();

        //load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
            let nativeHomeInputBox = document.getElementById('myadress').getElementsByTagName('input')[0];
            let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", () => {
                this.ngZone.run(() => {
                    //get the place result
                    let place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }

                    //set latitude, longitude and zoom
                    this.endereco = place.formatted_address;
                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                });
            });
        });
    }
    goToNovoevento2(params) {
        if (!params) params = {};
        this.navCtrl.push(Novoevento2Page);
    }

    submitForm(endereco: string, latitude: number, longitude: number) {

        var newAlbum: Lista = new Lista(this.endereco, this.latitude, this.longitude);
        this.listas.push(newAlbum);
        console.log(endereco);
        console.log(newAlbum);

    }
    /*
    export class Album {-------------------------feito
    constructor (public title: string, public artist: string, public description: string) {      }
  }
  
      constructor(private albumService: AlbumService) { }
  
    addAlbum(newAlbum: Album) {
      this.albums.push(newAlbum);
  
    }  submitForm(title: string, artist: string, description: string) {
      var newAlbum: Album = new Album(title, artist, description);
      this.albumService.addAlbum(newAlbum);
    }
      albums: FirebaseListObservable<any[]>; ---------------------feito
  
      constructor(private database: AngularFireDatabase) {
      this.albums = database.list('albums');--------------------------------feito
    }
    */



    private setCurrentPosition() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }

}


