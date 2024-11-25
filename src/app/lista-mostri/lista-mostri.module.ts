import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaMostriPageRoutingModule } from './lista-mostri-routing.module';

import { ListaMostriPage } from './lista-mostri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaMostriPageRoutingModule
  ],
  declarations: [ListaMostriPage]
})
export class ListaMostriPageModule {}
