import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreazionePersonaggioPageRoutingModule } from './creazione-personaggio-routing.module';

import { CreazionePersonaggioPage } from './creazione-personaggio.page';
import { ModificaPersonaggioComponent } from './modifica-personaggio/modifica-personaggio.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, CreazionePersonaggioPageRoutingModule],
  declarations: [CreazionePersonaggioPage, ModificaPersonaggioComponent]
})
export class CreazionePersonaggioPageModule {}
