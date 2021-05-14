import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LancamentosPageRoutingModule } from './lancamentos-routing.module';

import { LancamentosPage } from './lancamentos.page';
import { HeaderComponent } from '../compartilhado/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LancamentosPageRoutingModule
  ],
  declarations: 
  [
    LancamentosPage,
    HeaderComponent
  ]
})
export class LancamentosPageModule {}
