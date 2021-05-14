import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { AutenticacaoGuard } from './services/guards/autenticacao.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./pages/compartilhado/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'lancamentos',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./pages/lancamentos/lancamentos.module').then( m => m.LancamentosPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
