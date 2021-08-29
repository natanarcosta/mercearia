import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoletoDetailController } from '../boleto-detail/boleto-detail.controller';
import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-boleto-list-item',
  templateUrl: './boleto-list-item.component.html',
  styleUrls: ['./boleto-list-item.component.css']
})
export class BoletoListItemComponent implements OnInit {
  @Input() boleto!: Boleto;
  //Data de hoje usada para determinar no template se o boleto está vencido.
 today = new Date().getTime();
isLate = false;


  constructor(private boletosService: BoletosService,
              private boletoDetController: BoletoDetailController) { }

  ngOnInit(): void {
    this.isLate = this.evaluateDate();
  }

  onPay(id: number){
    if(!this.boleto.pago){
      this.boletosService.setToPaid(id);
    } else {
      this.boletosService.setToDue(id);
    }
  }

  onDelete(id: number){
    Swal.fire(
      {
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, deletar o boleto.',
        confirmButtonColor: 'red'
      }
    ).then((result) => {
      if(result.isConfirmed){
        this.boletosService.deleteBoleto(id);
      }
    })
  }

  openDialog(){
    this.boletoDetController.open(this.boleto.id).afterClosed().subscribe((boleto) => {
      this.boleto = boleto;
    });
  }

  evaluateDate(){
    return this.today > (new Date(this.boleto.vencimento).getTime())
  }
}
