import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGenericoResponse } from '../interfaces/IGenericoResponse';
import { IPlanoConta } from '../interfaces/IPlanoConta';

const apiUrlPlanoConta = environment.apiUrl + "PlanoConta";

@Injectable({
  providedIn: 'root'
})
export class PlanocontaService {
  constructor(public httpClient: HttpClient) { }

  cadastrar(planoConta: IPlanoConta) : Observable<IPlanoConta>{
    return this.httpClient.post<IPlanoConta>(apiUrlPlanoConta, planoConta);
  }

  atualizar(planoConta: IPlanoConta) : Observable<IPlanoConta>{
    return this.httpClient.put<IPlanoConta>(apiUrlPlanoConta, planoConta);
  }

  obterTodos(codigoUsuario: string) : Observable<IPlanoConta[]>{
    return this.httpClient.get<IPlanoConta[]>(apiUrlPlanoConta + '/' + codigoUsuario);
  }

  deletar(codigoUsuario: string, codigoPlanoConta: string) : Observable<IGenericoResponse>{
    return this.httpClient.delete<any>(apiUrlPlanoConta + '/' + codigoUsuario + '/' + codigoPlanoConta);
  }

  obterPorOperacao(codigoUsuario: string, operacao: string) {
    return this.httpClient.get<IPlanoConta[]>(apiUrlPlanoConta  + '/' + codigoUsuario + '/' + operacao);
  }
}
