import { Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BoletoDetailComponent } from '../boleto-detail/boleto-detail.component';
import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';

@Component({
  selector: 'app-boleto-list',
  templateUrl: './boleto-list.component.html',
  styleUrls: ['./boleto-list.component.css']
})
export class BoletoListComponent implements OnInit, OnDestroy{
  boletos: Boleto[] = [];
  boletoSub!: Subscription;
  isLoading = false;

  //Is Ascending Sorting, usado para poder alterar entre ordem crescente e decrescente
  isAscSort = {
    'date' : true,
    'value' : true,
    'status' : true
  }
  //showPaid = true;
  editMode = false;

  constructor(private boletosService: BoletosService, private router: Router, private route: ActivatedRoute, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.boletoSub = this.boletosService.boletoChanged.subscribe(() => {this.requestBoletos()});
    //Se há o parametro /searched na url, retorna o item pesquisado.
    //TO-DO: Lidar com erros e resultados nulos
    this.route.queryParams.subscribe((params: Params) => {
      if(this.route.snapshot.queryParamMap.has('searched')) {
        let searchedTerm: string = this.route.snapshot.queryParams['searched']
        this.boletos = this.boletosService.search(this.boletos, searchedTerm);
      } else {
        this.requestBoletos();
      }
    });
    this.boletoSub = this.boletosService.boletoChanged.subscribe((boletos: Boleto[]) => {
    this.boletos = boletos;
    });
  }

  ngOnDestroy(){
    this.boletoSub.unsubscribe();
  }

  onSortByDate(){
    this.boletos = this.boletosService.orderByDate(this.boletos, this.isAscSort.date);
    this.isAscSort.date = !this.isAscSort.date;
  }

  onSortByValue(){
    this.boletos = this.boletosService.orderByValue(this.boletos, this.isAscSort.date);
    this.isAscSort.date = !this.isAscSort.date;
  }

  requestBoletos(){
    this.isLoading = true;
    this.boletosService.getAllBoletos().subscribe(
      (boletos: Boleto[]) => {this.boletos = boletos, this.isLoading = false;}
    );
  }

  openDialog(){
    this.matDialog.open(BoletoDetailComponent).afterClosed().subscribe(() => {this.requestBoletos()});
  }

  /* togglePaid(){
    this.showPaid = !this.showPaid;
    if(!this.showPaid){
      this.boletos = this.boletosService.togglePaid(this.showPaid);
    } else {
      this.boletos = this.boletosService.getAllBoletos();
    }
  } */
}
