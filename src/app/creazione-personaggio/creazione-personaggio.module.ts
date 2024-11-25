import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreazionePersonaggioPageRoutingModule } from './creazione-personaggio-routing.module';

import { CreazionePersonaggioPage } from './creazione-personaggio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreazionePersonaggioPageRoutingModule
  ],
  declarations: [CreazionePersonaggioPage]
})
export class CreazionePersonaggioPageModule {}
