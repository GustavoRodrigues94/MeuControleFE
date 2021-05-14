import { Component, OnInit } from '@angular/core';
import { ILancamentoConta } from 'src/app/interfaces/ILancamentoConta';
import { LancamentoContaService } from 'src/app/services/lancamentoconta.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.page.html',
  styleUrls: ['./lancamentos.page.scss'],
})
export class LancamentosPage implements OnInit {
  lancamentos: ILancamentoConta[];
  codigoUsuarioLogado: string;

  constructor(private lancamentoContaService: LancamentoContaService,
              usuarioService: UsuarioService) { 
                this.codigoUsuarioLogado = usuarioService.obterCodigoUsuarioLogado;
              }

  ngOnInit() {
    this.obterLancamentosPorIntervalo(1);
  }

  obterLancamentosPorIntervalo(filtroDias: number){
    this.lancamentoContaService.obterLancamentosPorPeriodo(this.codigoUsuarioLogado, filtroDias).subscribe((res) => {
      this.lancamentos = res;
    })
  }
}
