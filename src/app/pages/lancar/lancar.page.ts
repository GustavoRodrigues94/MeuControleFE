import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular';
import { IGenericoResponse } from 'src/app/interfaces/IGenericoResponse';
import { ILancamentoConta } from 'src/app/interfaces/ILancamentoConta';
import { IPlanoConta } from 'src/app/interfaces/IPlanoConta';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { LancamentoContaService } from 'src/app/services/lancamentoconta.service';
import { PlanocontaService } from 'src/app/services/planoconta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SplashScreen } from '../compartilhado/splash-screen';

@Component({
  selector: 'app-lancar',
  templateUrl: 'lancar.page.html',
  styleUrls: ['lancar.page.scss']
})
export class LancarPage {
  @ViewChild('conteudo') private conteudo: IonContent;
  
  lancarContaForm: FormGroup;
  deveExibirPlanosDeContas: boolean = false;
  deveExibirDiasParaLancamento: boolean = false;
  deveExibirValorLancamento: boolean = false;
  deveExibirOpcoesRecorrencia: boolean = false;
  planosContas: IPlanoConta[];
  usuarioLogado: IUsuario;
 
  constructor(public formBuilder: FormBuilder,
              private splashScreen: SplashScreen,
              usuarioService: UsuarioService,
              private planoContaService: PlanocontaService,
              private lancamentoContaService: LancamentoContaService) {
                this.usuarioLogado = usuarioService.obterUsuarioLogado;
              }

  ngOnInit(){
    this.configurarFormLancarConta()
  }

  private configurarFormLancarConta() {
    this.lancarContaForm = this.formBuilder.group({
      codigo: [''],
      operacao: ['', [Validators.required]],
      codigoPlanoConta: ['', [Validators.required]],
      dataLancamento: ['', [Validators.required]],
      valor: ['', [Validators.required]]
    });
  }

  async exibirPlanosDeContas(operacaoSelecionada: string){
    await this.obterPlanosContasPorOperacao(operacaoSelecionada);
    this.deveExibirPlanosDeContas = true;
    this.lancarContaForm.patchValue({planoConta: ''})
  }

  async obterPlanosContasPorOperacao(operacao: string) {
    this.planoContaService.obterPorOperacao(this.usuarioLogado.codigo, operacao)
      .subscribe((res: IPlanoConta[]) => {
        this.planosContas = res;
      }, error => {
        this.splashScreen.avisarErro("Opa fion!", error.error.message);
      });
  }

  exibirDiasParaLancamentoValorLancamento(){
    this.deveExibirDiasParaLancamento = true;
    this.deveExibirValorLancamento = true;
    this.lancarContaForm.patchValue({recorrencia: '0'})
    this.enviarBarraDeRolagemParaFinalPagina();
  }

  exibirRecorrencia(){
    this.enviarBarraDeRolagemParaFinalPagina();
    this.deveExibirOpcoesRecorrencia = true;
  }

  async lancarConta(){
    var lancamentoConta = this.lancarContaForm.value as ILancamentoConta;
    lancamentoConta.usuario = this.usuarioLogado.codigo;
    lancamentoConta.valor = Number(lancamentoConta.valor.toString().replace(",", "."));

    this.lancamentoContaService.cadastrar(lancamentoConta).subscribe((res: IGenericoResponse) => {
      if(res.sucesso)
      {
        this.splashScreen.avisarSucesso("Sucesso!", "Sua conta foi lançada com sucesso");  
        this.limparForm();
      }
    }, error => {
        this.splashScreen.avisarErro("Opa fion!", error.error.message);
    });
      
  }

  limparForm() {
    this.lancarContaForm.reset();
    this.deveExibirPlanosDeContas = false;
    this.deveExibirDiasParaLancamento = false;
    this.deveExibirValorLancamento = false;
  }

  enviarBarraDeRolagemParaFinalPagina(){
    this.conteudo.scrollToBottom(500);
  }
}
