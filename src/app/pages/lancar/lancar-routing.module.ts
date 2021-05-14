import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancarPage } from './lancar.page';

const routes: Routes = [
  {
    path: '',
    component: LancarPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancarPageRoutingModule {}
