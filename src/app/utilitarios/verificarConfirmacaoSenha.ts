import { AbstractControl } from '@angular/forms';
export class VerificarConfirmacaoSenha {
  static CombinarSenha(abstractControl: AbstractControl) {
    let senha = abstractControl.get('senha').value;
    let repetirSenha = abstractControl.get('repetirSenha').value;
     if (senha != repetirSenha) {
         abstractControl.get('repetirSenha').setErrors({
            CombinarSenha: true
         })
    } else {
      return null;
    }
  }
 
}