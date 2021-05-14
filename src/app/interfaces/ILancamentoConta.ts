import { IPlanoConta } from './IPlanoConta';

export interface ILancamentoConta{
    usuario: string;
    operacao: string;
    codigoPlanoConta: string;
    dataLancamento: Date;
    valor: number;
    planoConta: IPlanoConta;
}