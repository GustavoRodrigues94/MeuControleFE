import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SplashScreen } from '../compartilhado/splash-screen';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  esconderSenha = true;


  constructor(public formBuilder: FormBuilder,
              private splashScreen: SplashScreen,
              private usuarioService: UsuarioService,
              private router: Router,
              private menuCtrl: MenuController) { }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      senha: ['', [Validators.required, Validators.minLength(5)]],
    })
  }

  async logar(){
    this.splashScreen.carregar();
    this.usuarioService.logar(this.loginForm.value as IUsuario)
      .subscribe(() => {
        this.splashScreen.fechar();
        this.router.navigate(['tabs']);
      }, error => {
        this.splashScreen.fechar();
        this.splashScreen.avisarInformacao("Opa fion!", error.error.message);
      });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
}
