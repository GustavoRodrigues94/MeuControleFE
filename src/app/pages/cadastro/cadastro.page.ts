import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VerificarConfirmacaoSenha } from 'src/app/utilitarios/verificarConfirmacaoSenha';
import { SplashScreen } from '../compartilhado/splash-screen';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cadastroForm: FormGroup;
  storage: Storage;

  constructor(private router: Router,
              public formBuilder: FormBuilder,
              private splashScreen: SplashScreen,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
      repetirSenha: ['', [Validators.required, Validators.minLength(5)]],
    }, {validator: VerificarConfirmacaoSenha.CombinarSenha})
  }

  cadastrar(){
    this.splashScreen.carregar();
    this.usuarioService.cadastrar(this.cadastroForm.value as IUsuario)
      .subscribe(() => {
        this.splashScreen.fechar();
        this.splashScreen.avisarSucessoComConfirmacao("Parabéns!", "Seu cadastro foi realizado.");
        this.router.navigate(['/']);
      }, error => {
        this.splashScreen.fechar();
        this.splashScreen.avisarErro("Opa fion!", "Ocorreu um erro, por favor, tente novamente...");
      });
  }
}
