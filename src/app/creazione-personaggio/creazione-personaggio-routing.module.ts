import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreazionePersonaggioPage } from './creazione-personaggio.page';

const routes: Routes = [
  {
    path: '',
    component: CreazionePersonaggioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreazionePersonaggioPageRoutingModule {}
