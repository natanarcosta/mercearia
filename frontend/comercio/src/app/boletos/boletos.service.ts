import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Subject } from 'rxjs';
import { Boleto } from './boleto.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BoletosService {
  boletoChanged = new Subject<Boleto[]>();
  url: string = 'http://localhost:3000/boletos/';

  constructor(private http: HttpClient) { }

  getAllBoletos(){
    return this.http.get<Boleto[]>(this.url);
  }

  getBoletoById(id: number){
    return this.http.get<Boleto>(this.url + id);
  }

  createBoleto(boleto: Boleto){
    this.http.post(this.url, boleto).subscribe();
  }

  deleteBoleto(id: number){
    this.http.delete(this.url + id).subscribe();
  }

  updateBoleto(id: number, boleto: Boleto){
   return this.http.patch(this.url + id, boleto).subscribe();
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

  orderByDate(ascendingOrder: boolean){
    //const newBoletos = ascendingOrder ?
    //this.boletos.sort((a,b) => a.dataVencimento > b.dataVencimento ? 1 : -1):
    //this.boletos.sort((a,b) => a.dataVencimento < b.dataVencimento ? 1 : -1);

    //return this.boletoChanged.next(newBoletos);
  }
  orderByValue(ascendingOrder: boolean){
    //const newBoletos = ascendingOrder ?
    //this.boletos.sort((a,b) => a.valor > b.valor ? 1 : -1):
    //this.boletos.sort((a,b) => a.valor < b.valor ? 1 : -1);
    //return this.boletoChanged.next(newBoletos);
  }
}
