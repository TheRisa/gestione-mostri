import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'lista-mostri',
        loadChildren: () => import('../lista-mostri/lista-mostri.module').then((m) => m.ListaMostriPageModule)
      },
      {
        path: 'creazione-personaggio',
        loadChildren: () =>
          import('../creazione-personaggio/creazione-personaggio.module').then((m) => m.CreazionePersonaggioPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/lista-mostri',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/lista-mostri',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {}
