import { Component, Input, OnInit } from '@angular/core';
import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';

@Component({
  selector: 'app-boleto-list-item',
  templateUrl: './boleto-list-item.component.html',
  styleUrls: ['./boleto-list-item.component.css']
})
export class BoletoListItemComponent implements OnInit {
  @Input() boleto!: Boleto;
  @Input() index!: number;
  //Data de hoje usada para determinar no template se o boleto está vencido.
  today = new Date();

  constructor(private boletosService: BoletosService) { }

  ngOnInit(): void {
  }

  onPay(id: number){
    if(!this.boleto.pago){
      this.boletosService.setToPaid(id);
    } else {
      this.boletosService.setToDue(id);
    }
  }

  onDelete(id: number){
    this.boletosService.deleteBoleto(id);
  }

  evaluateDate(){
    //Usado apenas para dar cor vermelha ao text da data de vencimento caso o boleto esteja vencido
    let today = new Date();
    return this.boleto.dataVencimento < today;
  }
}
