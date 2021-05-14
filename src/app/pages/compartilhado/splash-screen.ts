import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SplashScreen {

  constructor() { }

  carregar(): void {
    Swal.fire({
      title: 'Carregando',
      html: 'Por favor, aguarde...',
      imageUrl: '/assets/img/carregando.gif',
      showConfirmButton: false,
      heightAuto: false,
      customClass: {
        popup: 'no-background'
      },
      allowEscapeKey: false,
      allowOutsideClick: false
    })
  }

  avisarInformacao(title: string, text: string = '') {
    Swal.fire({
      title: title,
      text: text,
      icon: 'info',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3880ff',
      customClass: {
        popup: 'no-background'
      }
    });
  }

  avisarAlerta(title: string, text: string, imageUrl?: string) {
    return Swal.fire({
      title: title,
      html: text,
      icon: 'warning',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3880ff',
      imageUrl: imageUrl,
      customClass: {
        popup: 'no-background'
      }
    });
  }

  avisarSucesso(titulo: string, texto: string = ''){
    return Swal.fire({
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500,
      html: texto,
      customClass: {
        popup: 'no-background'
      }
    })
  }

  avisarSucessoComConfirmacao(title: string, text: string = '') {
    return Swal.fire({
      title: title,
      html: text,
      icon: 'success',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3880ff',
      customClass: {
        popup: 'no-background'
      }
    });
  }

  avisarErro(title: string, text: string = ''): Promise<any> {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'error',
      allowEscapeKey: false,
      allowOutsideClick: false,
      confirmButtonColor: '#3880ff'
    });
  }

  escolha(title: string, text: string, confirmButtonText: string = 'Sim', cancelButtonText: string = 'Não'): Promise<any> {
    return Swal.fire({
      title: title,
      html: text,
      allowEscapeKey: false,
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      reverseButtons: true,
      heightAuto: false,
      confirmButtonColor: '#78cbf2',
      focusConfirm: false,
      focusCancel: false
    });
  }

  fechar(): void {
    Swal.close();
  }
}
