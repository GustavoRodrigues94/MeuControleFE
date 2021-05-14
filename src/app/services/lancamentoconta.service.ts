import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenericoResponse } from '../interfaces/IGenericoResponse';
import { ILancamentoConta } from '../interfaces/ILancamentoConta';

const apiUrlLancamentoConta = environment.apiUrl + "LancamentoConta";

@Injectable({
  providedIn: 'root'
})
export class LancamentoContaService {
  constructor(public httpClient: HttpClient) { }

  cadastrar(lancamentoConta: ILancamentoConta) : Observable<IGenericoResponse>{
    return this.httpClient.post<IGenericoResponse>(apiUrlLancamentoConta, lancamentoConta);
  }

  obterLancamentosPorPeriodo(usuario: string, filtroDias: number) : Observable<ILancamentoConta[]> {
    return this.httpClient.get<ILancamentoConta[]>(apiUrlLancamentoConta + '/' + usuario + '/' + filtroDias);
  }
}
