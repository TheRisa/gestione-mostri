import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreazionePersonaggioPage } from './creazione-personaggio.page';
import { InserisciDatiMostroComponent } from './inserisci-dati-mostro/inserisci-dati-mostro.component';

const routes: Routes = [
  {
    path: '',
    component: CreazionePersonaggioPage
  },
  {
    path: 'inserisci-dati',
    component: InserisciDatiMostroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreazionePersonaggioPageRoutingModule {}
