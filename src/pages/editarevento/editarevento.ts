import { ProviderProvider } from '../provider';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeuseventosPage } from '../meuseventos/meuseventos';

@IonicPage()
@Component({
  selector: 'page-editarevento',
  templateUrl: 'editarevento.html',
})
export class EditareventoPage {
  title: string;
  form: FormGroup;
  contact: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProviderProvider,
    private toast: ToastController) {

    // maneira 1
    this.contact = this.navParams.data.contact || { };
    this.createForm();

    // // maneira 2
    // this.contact = { };
    // this.createForm();

    // if (this.navParams.data.key) {
    //   const subscribe = this.provider.get(this.navParams.data.key).subscribe((c: any) => {
    //     subscribe.unsubscribe();

    //     this.contact = c;
    //     this.createForm();
    //   })
    // }

    this.setupPageTitle();
  }

  private setupPageTitle() {
    this.title = this.navParams.data.contact ? 'Editando evento' : 'Novo evento';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.contact.$key],
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
  goToMeuseventos()
  {
    this.navCtrl.setRoot(MeuseventosPage);

  }
}