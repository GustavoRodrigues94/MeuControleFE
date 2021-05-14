import { Pipe, PipeTransform } from '@angular/core';
import { IPlanoConta } from 'src/app/interfaces/IPlanoConta';

@Pipe({
    name: 'FiltroPlanosEntradaSaida',
    pure: false
})
export class FiltrarPlanosEntradaSaidaPipe implements PipeTransform {
    transform(items: IPlanoConta[], filter: string): IPlanoConta[] {
        if (!items || !filter) {
            return items;
        }
        
        return items.filter(item => item.operacao.indexOf(filter) !== -1);
    }
}