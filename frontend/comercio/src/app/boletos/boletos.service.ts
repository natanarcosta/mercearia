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


  constructor(private http: HttpClient) { }

  getAllBoletos(){
    return this.http.get<Boleto[]>('http://localhost:3000/boletos');
  }

  getBoletoById(id: number){
    return this.http.get<Boleto>('http://localhost:3000/boletos/' + id);
  }

  createBoleto(boleto: Boleto){
    this.http.post('http://localhost:3000/boletos', boleto).subscribe();
  }

  deleteBoleto(id: number){
    this.http.delete('http://localhost:3000/boletos/' + id).subscribe();
  }

  updateBoleto(id: number, boleto: Boleto){
   return this.http.patch('http://localhost:3000/boletos/' + id, boleto).subscribe();
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

  generateNewId(){
    //return this.boletos.length+1;
  }

  search(terms: string){
   // return this.boletos.filter((boleto) => boleto.empresa.toLowerCase().includes(terms.toLowerCase()));
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
