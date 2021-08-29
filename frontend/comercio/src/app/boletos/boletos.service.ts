import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
import { Boleto } from './boleto.model';
import { environment } from 'src/environments/environment';
import {switchMap} from 'rxjs/operators'

const {url} = environment;
@Injectable({
  providedIn: 'root'
})
export class BoletosService {
  boletoChanged = new Subject<Boleto[]>();

  constructor(private http: HttpClient) { }

   getAllBoletos() : Observable<Boleto[]> {
    return this.http.get<Boleto[]>(url);
  }

  getBoletoById(id: number) : Observable<Boleto>{
    return this.http.get<Boleto>(url + id);
  }

  createBoleto(boleto: Boleto){
    //to-do mensagem de confirmação
    return this.http.post(url, boleto);
  }

  deleteBoleto(id: number){
    this.http.delete(url + id).subscribe();
  }

  updateBoleto(id: number, boleto: Boleto){
   return this.http.patch(url + id, boleto);
  }

  setToPaid(id: number){
    //const index = this.boletos.findIndex((boleto) => boleto.id === id);
    //this.boletos[index].pago = true;
    //return this.boletoChanged.next(this.boletos);
  }

  setToDue(id: number){
    //const index = this.boletos.findIndex((boleto) => boleto.id === id);
    //this.boletos[index].pago = false;
    //return this.boletoChanged.next(this.boletos);
  }

  search(unfilteredBoletos: Boleto[], searchedTerm: string){
    return unfilteredBoletos.filter((boleto) => boleto.empresa.toLowerCase().includes(searchedTerm.toLowerCase()));
  }

  togglePaid(showPaid: boolean){
    //return this.boletos.filter((boleto) => !boleto.pago);
  }

  orderByDate(boletos: Boleto[], ascendingOrder: boolean){
    const sortedBoletos = ascendingOrder ?
    boletos.sort((a,b) => a.vencimento > b.vencimento ? 1 : -1):
    boletos.sort((a,b) => a.vencimento < b.vencimento ? 1 : -1);
    return sortedBoletos;
  }
  orderByValue(boletos: Boleto[], ascendingOrder: boolean){
    const sortedBoletos = ascendingOrder ?
    boletos.sort((a,b) => a.valor > b.valor ? 1 : -1):
    boletos.sort((a,b) => a.valor < b.valor ? 1 : -1);
    return sortedBoletos;
  }
}
