import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoletoDetailComponent } from '../boleto-detail/boleto-detail.component';
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
  @Input() index!: number;
  //Data de hoje usada para determinar no template se o boleto está vencido.
 today = new Date().getTime();


  constructor(private boletosService: BoletosService,
    private router: Router,
    private matDialog: MatDialog,
    private boletoDetController: BoletoDetailController) { }

  ngOnInit(): void {}

  onPay(id: number){
    if(!this.boleto.pago){
      this.boletosService.setToPaid(id);
    } else {
      this.boletosService.setToDue(id);
    }
  }

  onDelete(id: number){
    this.boletosService.deleteBoleto(id);
    this.router.navigate(['boletos']);
  }
  openDialog(){
    this.boletoDetController.open(this.boleto.id).afterClosed().subscribe((boleto) => {
      this.boleto = boleto;
    });
  }
}
