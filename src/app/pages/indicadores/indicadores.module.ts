import { IonicModule } from '@ionic/angular';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IndicadoresPageRoutingModule } from './indicadores-routing.module';
import { IndicadoresPage } from './indicadores.page';
import { HeaderComponent } from '../compartilhado/header/header.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IndicadoresPageRoutingModule
  ],
  declarations: [
    IndicadoresPage, 
    HeaderComponent
  ]
})
export class IndicadoresPageModule {}
