import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'indicadores',
        loadChildren: () => import('../../indicadores/indicadores.module').then(m => m.IndicadoresPageModule)
      },
      {
        path: 'lancar',
        loadChildren: () => import('../../lancar/lancar.module').then(m => m.LancarPageModule)
      },
      {
        path: 'planos-contas',
        loadChildren: () => import('../../planos-contas/planos-contas.module').then(m => m.PlanosContasPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/indicadores',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/indicadores',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
