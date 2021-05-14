import { Component, ElementRef, ViewChild } from '@angular/core';
import { IUsuario } from 'src/app/interfaces/IUsuario';
import { IndicadorService } from 'src/app/services/indicador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Chart } from 'chart.js';
import 'chartjs-plugin-labels';
import { IIndicadorTop5Saidas } from 'src/app/interfaces/IIndicadorTop5Saidas';

@Component({
  selector: 'app-indicadores',
  templateUrl: 'indicadores.page.html',
  styleUrls: ['indicadores.page.scss']
})
export class IndicadoresPage {
  @ViewChild('graficoSaidasPorPlanoConta')  graficoTop5SaidasCanvas: ElementRef;

  graficoTop5Saidas: Chart;
  usuarioLogado: IUsuario;
  saldo: number;
  saldoPodeGastar: number;

  constructor(public usuarioService: UsuarioService,
              private indicadorService: IndicadorService) {
                this.usuarioLogado = usuarioService.obterUsuarioLogado;  
              }
  
  ngOnInit() {
    Chart.defaults.global.legend.labels.usePointStyle = true;
  }

  ionViewWillEnter() {
    this.obterSaldo(1);
    this.obterSaldoPodeGastar(3);
    this.obterGraficoSaidasPorPlanoConta(1);
  }

  async obterSaldoPodeGastar(filtroDiaSemanaMes: number) {
    this.indicadorService.obterSaldoPodeGastar(this.usuarioLogado.codigo, filtroDiaSemanaMes).subscribe((res) => {
      this.saldoPodeGastar = res;
    })
  }

  async obterSaldo(filtroMes: number) {
    this.indicadorService.obterSaldo(this.usuarioLogado.codigo, filtroMes).subscribe((res) => {
      this.saldo = res;
    })
  }

  async obterGraficoSaidasPorPlanoConta(filtroMes: number) {
    this.indicadorService.obterGraficoSaidasPorPlanoConta(this.usuarioLogado.codigo, filtroMes).subscribe((res : IIndicadorTop5Saidas[]) => {
      let indicadorTop5SaidasLabels = [];
      let indicadorTop5SaidasDatas = [];


      res.forEach(element => {
        indicadorTop5SaidasLabels.push(element.nomePlanoConta);
        indicadorTop5SaidasDatas.push(element.valor);
      });
   
      this.graficoTop5Saidas = new Chart(this.graficoTop5SaidasCanvas?.nativeElement, {
        type: 'pie',
        options: {
          legend: {
            display: true,
            position: 'bottom',
            align: "center",
          },
          plugins:{
            labels: {
              render: function (args: { value: number; }) {
                return  'R$' + args.value?.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
              },
              position: 'outside',
            }
          }
        },
        data: {
          labels: indicadorTop5SaidasLabels,
          datasets: [{
            data: indicadorTop5SaidasDatas,
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(255, 69 , 0, 0.5)',
              'rgba(255, 165, 0, 0.5)',
              'rgba(240, 230, 140, 0.5)',
              'rgba(230, 230, 250, 0.5)'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#FF4500',
              '#FFA500',
              '#F0E68C',
              '#E6E6FA'
            ]
          }]
        }, 
      });
    })
  }
}
