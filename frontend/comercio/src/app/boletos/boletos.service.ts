import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Boleto } from './boleto.model';

@Injectable({
  providedIn: 'root'
})
export class BoletosService {
   boletoChanged = new Subject<Boleto[]>();

  constructor() { }
  private boletos: Boleto[] = [
    new Boleto(1, 'Bartofil', new Date("2022-08-25"), 550),
    new Boleto(1, 'Bartofil', new Date("2021-08-25"), 550),
    new Boleto(2, 'Anchieta', new Date('2021-08-26'), 1400),
    new Boleto(3, 'Peixoto', new Date('2021-08-19'), 900),
    new Boleto(4, 'Santana', new Date('2021-08-26'), 220),
    new Boleto(5, 'Pet Center', new Date('2021-08-30'), 310),
    new Boleto(6, 'Bartofil', new Date('2021-09-25'), 550),
    new Boleto(7, 'Anchieta', new Date('2021-09-02'), 438),
    new Boleto(8, 'Multimix', new Date('2021-08-28'), 256),
    new Boleto(9, 'Tudobom', new Date('2021-09-15'), 420),
    new Boleto(10, 'Bartofil', new Date('2021-10-25'), 550),
    new Boleto(10, 'Bartofil', new Date('2021-09-07'), 550),
  ]

  getAllBoletos(){
    return this.boletos.sort((a,b) => a.dataVencimento > b.dataVencimento ? 1 : -1);
  }

  getBoletoById(id: number){
    const index = this.boletos.findIndex((boleto) => boleto.id === id);
    return this.boletos[index];
  }

  createBoleto(boleto: Boleto){
    this.boletos.push(boleto);
    return this.boletoChanged.next(this.boletos);
  }

  deleteBoleto(id: number){
    const index = this.boletos.findIndex((boleto) => boleto.id === id);
    this.boletos.splice(index, 1);
    return this.boletoChanged.next(this.boletos);
  }

  updateBoleto(id: number, boleto: Boleto){
    const index = this.boletos.findIndex((boleto) => boleto.id === id);
    this.boletos[index] = boleto;
    return this.boletoChanged.next(this.boletos);
  }

  setToPaid(id: number){
    const index = this.boletos.findIndex((boleto) => boleto.id === id);
    this.boletos[index].pago = true;
    return this.boletoChanged.next(this.boletos);
  }

  setToDue(id: number){
    const index = this.boletos.findIndex((boleto) => boleto.id === id);
    this.boletos[index].pago = false;
    return this.boletoChanged.next(this.boletos);
  }

  generateNewId(){
    return this.boletos.length+1;
  }

  search(terms: string){
    return this.boletos.filter((boleto) => boleto.empresa.toLowerCase().includes(terms.toLowerCase()));
  }

  togglePaid(showPaid: boolean){
    return this.boletos.filter((boleto) => !boleto.pago);
  }

  orderByDate(ascendingOrder: boolean){
    const newBoletos = ascendingOrder ?
    this.boletos.sort((a,b) => a.dataVencimento > b.dataVencimento ? 1 : -1):
    this.boletos.sort((a,b) => a.dataVencimento < b.dataVencimento ? 1 : -1);

    return this.boletoChanged.next(newBoletos);
  }
  orderByValue(ascendingOrder: boolean){
    const newBoletos = ascendingOrder ?
    this.boletos.sort((a,b) => a.valor > b.valor ? 1 : -1):
    this.boletos.sort((a,b) => a.valor < b.valor ? 1 : -1);
    return this.boletoChanged.next(newBoletos);
  }
}
