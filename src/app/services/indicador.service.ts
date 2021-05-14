import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrlLancamentoConta = environment.apiUrl + "Indicador";

@Injectable({
  providedIn: 'root'
})
export class IndicadorService {
  constructor(public httpClient: HttpClient) { }

  obterSaldo(usuario: string, filtroMes: number) : Observable<any>{
    return this.httpClient.get<any>(apiUrlLancamentoConta + '/Saldo/' + usuario + '/' + filtroMes);
  }

  obterGraficoSaidasPorPlanoConta(usuario: string, filtroMes: number) : Observable<any> {
    return this.httpClient.get<any>(apiUrlLancamentoConta + '/Top5Gastos/' + usuario + '/' + filtroMes);
  }

  obterSaldoPodeGastar(usuario: string, filtroDiaSemanaMes: number) {
    return this.httpClient.get<any>(apiUrlLancamentoConta + '/SaldoPodeGastar/' + usuario + '/' + filtroDiaSemanaMes);
  }
}
