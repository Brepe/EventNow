import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform, NavParams } from 'ionic-angular';
import * as firebase from 'Firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';


@Component({
  selector: 'page-lista-prox',
  templateUrl: 'lista-prox.html'
})
export class listaProxPage {


  constructor(public navParams: NavParams,public navCtrl: NavController,
    public platform: Platform,
    private geolocation: Geolocation,
    private device: Device) {

    }
  }

