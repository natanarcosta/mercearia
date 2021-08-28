import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';

@Component({
  selector: 'app-boleto-list',
  templateUrl: './boleto-list.component.html',
  styleUrls: ['./boleto-list.component.css']
})
export class BoletoListComponent implements OnInit, OnDestroy {
  boletos: Boleto[] = [];
  boletoSub!: Subscription;

  //Is Ascending Sorting, usado para poder alterar entre ordem crescente e decrescente
  isAscSort = {
    'date' : true,
    'value' : true,
    'status' : true
  }
  //showPaid = true;
  editMode = false;

  constructor(private boletosService: BoletosService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.boletoSub = this.boletosService.boletoChanged.subscribe();
    //Se há o parametro /searched na url, retorna o item pesquisado.
    //TO-DO: Lidar com erros e resultados nulos
    this.route.queryParams.subscribe((params: Params) => {
      if(this.route.snapshot.queryParamMap.has('searched')) {
        let searchedTerm: string = this.route.snapshot.queryParams['searched']
        this.boletos = this.boletosService.search(this.boletos, searchedTerm);
      } else {
        this.boletosService.getAllBoletos().subscribe(
          (boletos: Boleto[]) => {
            this.boletos = boletos;
          }
        )
      }
    });

     this.boletoSub = this.boletosService.boletoChanged.subscribe((boletos: Boleto[]) => {
      this.boletos = boletos;
      console.log('BoletoChanged fired');
    });

  }
  ngOnDestroy(){
    this.boletoSub.unsubscribe();
  }
  onSortByDate(){
/*     this.boletosService.orderByDate(this.isAscSort.date);
    this.isAscSort.date = !this.isAscSort.date; */
  }
  onSortByValue(){
/*     this.boletosService.orderByValue(this.isAscSort.value);
    this.isAscSort.value = !this.isAscSort.value; */
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
