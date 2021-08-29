import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { BoletoDetailController } from '../boleto-detail/boleto-detail.controller';
import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';

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
    this.boleto.pago = !this.boleto.pago;
    this.boletosService.updateBoleto(id, this.boleto).subscribe(() => {this.boletosService.boletoChanged.next()});
  }

  onDelete(id: number){
    Swal.fire(
      {
        title: 'Tem certeza?',
        text: 'Esta ação não pode ser desfeita!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText:'Cancelar',
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
