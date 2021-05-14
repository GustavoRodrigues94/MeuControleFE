import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LancamentosPage } from './lancamentos.page';

const routes: Routes = [
  {
    path: '',
    component: LancamentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LancamentosPageRoutingModule {}
