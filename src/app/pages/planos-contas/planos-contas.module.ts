import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanosContasPage } from './planos-contas.page';

import { PlanosContasRoutingModule } from './planos-contas-routing.module'
import { FiltrarPlanosEntradaSaidaPipe } from '../compartilhado/pipes/FiltrarPlanosEntradaSaidaPipe';
import { HeaderComponent } from '../compartilhado/header/header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PlanosContasRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlanosContasPage,
    FiltrarPlanosEntradaSaidaPipe,
    HeaderComponent
  ]
})
export class PlanosContasPageModule {}
