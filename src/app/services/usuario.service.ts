import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUsuario } from '../interfaces/IUsuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SplashScreen } from '../pages/compartilhado/splash-screen';

const apiUrlUsuario = environment.apiUrl + "Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(public httpClient: HttpClient,
              private router: Router,
              private splashScreen: SplashScreen) { }

  cadastrar(usuario: IUsuario): Observable<IUsuario> {
    return this.httpClient.post<IUsuario>(apiUrlUsuario, usuario);
  }

  logar(usuario: IUsuario) : Observable<IUsuario> {
    return this.httpClient.post<any>(apiUrlUsuario + "/login", usuario).pipe(
      tap((res) => {
        localStorage.setItem('token', btoa(JSON.stringify(res.token)));
        localStorage.setItem('usuario', btoa(JSON.stringify(res.usuario)));
      }));
  }

  deslogar(perguntar: boolean) {
    if(perguntar){
      this.splashScreen.escolha("Sair/Trocar usuário", "Deseja realmente sair?").then((resposta) => {
        if(resposta.isConfirmed)
        {
          localStorage.clear();
          this.router.navigate(['login']);
        }
      })
    }
    else{
      localStorage.clear();
      this.router.navigate(['login']);
    }
  }

  get obterUsuarioLogado(): IUsuario {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario')))
      : null;
  }

  get obterCodigoUsuarioLogado(): string {
    return localStorage.getItem('usuario')
      ? (JSON.parse(atob(localStorage.getItem('usuario'))) as IUsuario).codigo
      : null;
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token')))
      : null;
  }

  get logado(): boolean {
    return localStorage.getItem('usuario') ? true : false;
  }
}
