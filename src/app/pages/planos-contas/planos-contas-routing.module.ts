import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanosContasPage } from './planos-contas.page';

const routes: Routes = [
  {
    path: '',
    component: PlanosContasPage,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
  ],
  exports: [RouterModule]
})
export class PlanosContasRoutingModule {}
