import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeuseventosPage } from './meuseventos';

@NgModule({
  declarations: [
    MeuseventosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeuseventosPage),
  ],
})
export class MeuseventosPageModule {}
