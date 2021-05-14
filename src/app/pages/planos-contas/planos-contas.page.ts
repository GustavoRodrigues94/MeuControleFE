import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { IonContent } from '@ionic/angular';
import { IGenericoResponse } from 'src/app/interfaces/IGenericoResponse';
import { IPlanoConta } from 'src/app/interfaces/IPlanoConta';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { PlanocontaService } from 'src/app/services/planoconta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SplashScreen } from '../compartilhado/splash-screen';

@Component({
  selector: 'app-planoscontas',
  templateUrl: 'planos-contas.page.html',
  styleUrls: ['planos-contas.page.scss']
})
export class PlanosContasPage {
  planoContaForm: FormGroup;
  usuarioLogado: IUsuario;
  planosContas: IPlanoConta[];
  atualizandoPlanoConta: boolean;

  @ViewChild(IonContent) content: IonContent;
  
  constructor(public formBuilder: FormBuilder, 
              private splashScreen: SplashScreen,
              private planoContaService: PlanocontaService,
              private usuarioService: UsuarioService) { 
                this.usuarioLogado = this.usuarioService.obterUsuarioLogado;
              }

  ngOnInit() {
    this.configurarFormPlanoConta();
    this.obterPlanosContas(this.usuarioLogado.codigo);
  }

  private configurarFormPlanoConta() {
    this.planoContaForm = this.formBuilder.group({
      codigo: [''],
      nome: ['', [Validators.required, Validators.minLength(5)]],
      operacao: ['', [Validators.required]],
    });
  }

  async cadastrarPlanoConta(){
    var planoConta = this.planoContaForm.value as IPlanoConta;
    planoConta.usuario = this.usuarioLogado.codigo;

    this.planoContaService.cadastrar(planoConta)
      .subscribe(() => {
        this.splashScreen.avisarSucesso("Plano de conta cadastrado!");
        this.limparCampos(this.planoContaForm);
        this.obterPlanosContas(this.usuarioLogado.codigo);
      }, error => {
        this.splashScreen.avisarErro("Opa fion!", error.error);
      });
  }

  async atualizarPlanoConta(){
    var planoConta = this.planoContaForm.value as IPlanoConta;
    planoConta.usuario = this.usuarioLogado.codigo;

    this.planoContaService.atualizar(planoConta)
      .subscribe((res : any) => {
        if(res.sucesso)
        {
          this.splashScreen.avisarSucesso("Plano de conta atualizado!");
          this.limparCampos(this.planoContaForm);
          this.obterPlanosContas(this.usuarioLogado.codigo);}
      }, error => {
        this.splashScreen.avisarErro("Opa fion!", error.error);
      });
  }

  async deletarPlanoConta(codigoPlanoConta: string){
    this.splashScreen.escolha("Plano de conta", "Deseja realmente deletar o plano de conta?").then((resposta) => {
      if(resposta.isConfirmed)
        this.planoContaService.deletar(this.usuarioLogado.codigo, codigoPlanoConta)
        .subscribe((res : IGenericoResponse) => {
          if(res.sucesso)
            this.obterPlanosContas(this.usuarioLogado.codigo)
        }, error => {
          this.splashScreen.avisarErro("Opa fion!", error.error);
        });
    })
  }

  async setarFormPlanoConta(planoConta: IPlanoConta){
    this.planoContaForm.patchValue({
      codigo: planoConta.codigo,
      nome: planoConta.nome,
      operacao: planoConta.operacao == 'e' ? "entrada" : "saida"
    }); 
    this.atualizandoPlanoConta = true;
    this.content.scrollToTop(400);
  }

  async obterPlanosContas(codigoUsuario: string) {
    this.planoContaService.obterTodos(codigoUsuario)
      .subscribe((res: IPlanoConta[]) => {
        this.planosContas = res;
      }, error => {
        this.splashScreen.avisarErro("Opa fion!", error.error.message);
      });
  }

  limparCampos(planoContaForm: FormGroup) {
    planoContaForm.reset();
    this.atualizandoPlanoConta = false;
  }
}
