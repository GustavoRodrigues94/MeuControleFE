import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndicadoresPage } from './indicadores.page';

const routes: Routes = [
  {
    path: '',
    component: IndicadoresPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndicadoresPageRoutingModule {}
