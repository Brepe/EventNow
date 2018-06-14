import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
//import { MapProxPagePage } from '../Map-prox/Map-prox';

import { Novoevento2Page } from '../novoevento2/novoevento2';
import { listaProxPage } from '../lista-prox/lista-prox';
import { AngularFireDatabaseModule } from "angularfire2/database";
import {
  AngularFireDatabase,
  FirebaseObjectObservable,
  FirebaseListObservable
} from 'angularfire2/database-deprecated';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { Http } from '@angular/http';
import { MapProxPage } from '../Map-prox/Map-prox';
import { SugerirPage } from '../sugerir/sugerir';
import { SugestoesPage } from '../sugestoes/sugestoes';
import { Userclass } from '../../app/providers/user';
import { FormBuilder , FormGroup, Validators} from '@angular/forms';
import { ProviderProvider } from '../provider';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';  //<<<<por causa do erro do ngmodule nos cadastros
// import { CommonModule } from '@angular/common'; //<<<<por causa do erro do ngmodule nos cadastros

export class User1 {//para cadastrar
  id: string;
  login: string;
  password: string;
  email: string
}
@Injectable()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  use = {} as Userclass;

  user: User1; //para cadastrar
  usuario: FirebaseListObservable<any[]>;//para exibir e cadastrar

  form: FormGroup;
  people: any;

  constructor(private toastCtrl: ToastController, public afauth: AngularFireAuth,private toast: ToastController,
    public db: AngularFireDatabase, public af: AngularFireModule, public navCtrl: NavController,private alertCtrl: AlertController,
    public navParams: NavParams, public http: Http, private formBuilder: FormBuilder, private provider: ProviderProvider) {

    this.usuario = this.db.list('/usuario');//para exibir e cadastrar
    this.use = new User1();//para cadastrar

    this.people = this.navParams.data.contact || {};
    this.createForm();
  }

  ngOnInit() {
    this.use = {} as Userclass;
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.people.$key],
      email: [this.people.email, Validators.required],
      password: [this.people.password, Validators.required],
      displayName: [this.people.displayName, Validators.required],

    });
  }
  onSubmit() {
    if (this.form.valid) {
      this.provider.savePeople(this.form.value)
        .then(() => {
          
          this.presentToast();

          this.navCtrl.setRoot(HomePage);
        })
        .catch((e) => {
          let alert = this.alertCtrl.create({
            title: 'Erro! Tente novamente.',
            buttons: ['OK']
          });
          alert.present();           
          console.log(e);

        })
    }
  }

  async cadastrar(use: Userclass) {//para cadastrar

    try {
      
      const result = await this.afauth.auth.createUserAndRetrieveDataWithEmailAndPassword(use.email, use.password);
      console.log(result);
      if (result){
      // this.usuario.push(this.use).then(() => {
      //   this.use = new User1();
      // });
      this.onSubmit();
    }
    } catch (e) {
      let alert = this.alertCtrl.create({
        title: 'Digite corretamente o e-mail.',
        buttons: ['OK']
      });
      alert.present();      
      console.log(e);
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Usuário foi criado. Logado!',
      duration: 5000,
      position: 'middle',
      showCloseButton: true,
      closeButtonText: 'x'
    });
   toast.present();
  }
goToHome(){
    this.navCtrl.setRoot(HomePage);
}
}
