import { NavController, ToastController ,NavParams} from 'ionic-angular';
import { Component,  ElementRef } from '@angular/core';

import { MapProxPage } from '../Map-prox/Map-prox';
import { HomePage } from '../home/home';
import { listaProxPage } from '../lista-prox/lista-prox';
import { CadastroPage } from '../cadastro/cadastro';
import { myService } from '../services/data.service';
// import { AngularFireList } from 'angularfire2/database';
import {
  AngularFireDatabase,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'Firebase';
import { Observable } from 'rxjs/Observable';
import { MeuseventosPage } from '../meuseventos/meuseventos';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProviderProvider } from '../provider';


/*export class Lista {//para cadastrar

  constructor(public endereco: string, public lat: number, public lng: number, public uf: string) { }


}*/
export class Listar {//para cadastrar
  id: string;
  uf: string;
  endereco: string;
  lat: number;
  lng: number;
  toppings: string;
  timeStart: string;
  dayEnds: string;
  month: string;
  description: string;
  event: string;

}

@Component({
  selector: 'page-novoevento2',
  templateUrl: 'novoevento2.html'
})



export class Novoevento2Page {
  authid;
  use: Observable<firebase.User>; //para o auth firebase ngif
  public lat: number;
  public lng: number;
  public endereco: string;
  lista: Listar; //para cadastrar
  listas: FirebaseListObservable<any[]>;//para exibir e cadastrar

  public example: string;
  form: FormGroup;
  contact: any;
  constructor(private database: AngularFireDatabase, public navCtrl: NavController,   private formBuilder: FormBuilder, private provider: ProviderProvider,
    private _myService: myService, public afauth: AngularFireAuth, private toast: ToastController, public navParams: NavParams) {
    console.log(this._myService.getData());
    console.log(this._myService.getDatalat());
    console.log(this._myService.getDatalon());

    this.use = afauth.authState; //para o auth firebase ngif
    this.use.subscribe(result => this.authid = result.email);

    this.listas = this.database.list('/eventos');
    this.lista = new Listar();//para cadastrar

    //formcontrol
    this.contact = this.navParams.data.contact || { };
    this.createForm();

  }
  /*submitForm(endereco: string, lat: number, lng: number) {

    var newAlbum: Lista = new Lista(this.endereco, this.lat, this.lng);
    this.listas.push(newAlbum);
    console.log(endereco);
    console.log(newAlbum);

}*/
createForm() {
  this.form = this.formBuilder.group({
    key: [this.contact.$key],
    authid: [this.contact.authid, Validators.required],
    lat: [this.contact.lat, Validators.required],
    lng: [this.contact.lng, Validators.required],
    toppings: [this.contact.toppings, Validators.required],
    endereco: [this.contact.endereco, Validators.required],
    month: [this.contact.month, Validators.required],
    timeStarts: [this.contact.timeStarts, Validators.required],
    dayEnds: [this.contact.dayEnds, Validators.required],
    timeEnds: [this.contact.timeEnds, Validators.required],
    etaria: [this.contact.etaria, Validators.required],
    event: [this.contact.event, Validators.required],
    description: [this.contact.description, Validators.required],
  });
}


onSubmit() {
  if (this.form.valid) {
    this.provider.save(this.form.value)
      .then(() => {
        this.toast.create({ message: 'Evento salvo com sucesso.', duration: 3000 }).present();
        this.navCtrl.setRoot(MeuseventosPage);
      })
      .catch((e) => {
        this.toast.create({ message: 'Erro ao salvar o evento.', duration: 3000 }).present();
        console.error(e);
      })
  }
}
ionViewWillEnter() {
    this.afauth.authState.subscribe(data => console.log(data)
    );

    firebase.auth().onAuthStateChanged(function (use) {
      //this.authmail = use.email;
      if (use) {
        console.log(" User is signed in.");
      } else {
        console.log("No user is signed in.");
      }
    });
    //console.log(this.authmail);
  }
  cadastrar() {//para cadastrar
    this.listas.push(this.lista).then(() => {
      this.toast.create({ message: 'Salvo com sucesso.', duration: 3000 }).present();
      this.navCtrl.push(MeuseventosPage);
    });
  }


  goToMapProxPage(params) {
    if (!params) params = {};
    this.navCtrl.push(MapProxPage);
  } goToHome(params) {
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  } goTolistaProx(params) {
    if (!params) params = {};
    this.navCtrl.push(listaProxPage);
  } goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  } goToNovoevento2(params) {
    if (!params) params = {};
    this.navCtrl.push(Novoevento2Page);
  }
}
