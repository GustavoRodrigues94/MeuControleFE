import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LancarPage } from './lancar.page';
import { LancarPageRoutingModule } from './lancar-routing.module';
import { BrMaskerModule } from 'br-mask';
import { HeaderComponent } from '../compartilhado/header/header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LancarPageRoutingModule,
    ReactiveFormsModule,
    BrMaskerModule
  ],
  declarations: [
    LancarPage,
    HeaderComponent
  ]
})
export class LancarPageModule {}
