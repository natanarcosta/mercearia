import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterStateSnapshot } from '@angular/router';

import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';

@Component({
  selector: 'app-boleto-detail',
  templateUrl: './boleto-detail.component.html',
  styleUrls: ['./boleto-detail.component.css']
})
export class BoletoDetailComponent implements OnInit {
  id!: number;
  boleto!: Boleto;
  form!: FormGroup;
  //editMode determina se o formulário que abrirá estará em branco (criar boleto) ou com dados para editar um boleto existente.
  editMode: boolean = true;

  constructor(private boletosService: BoletosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
      }
    )
  }

  private initForm(){
    let empresa = null;
    let data = null;
    let valor = null;

    if(this.editMode){
      this.boleto = this.boletosService.getBoletoById(this.id);
      empresa = this.boleto.empresa;
      data = this.boleto.dataVencimento;
      valor = this.boleto.valor;
    }

    this.form = new FormGroup({
      'empresa': new FormControl(empresa, Validators.required),
      'data': new FormControl(data, Validators.required),
      'valor': new FormControl(valor, [Validators.required, Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/)]) //RegEx para floats positivos
     })
  }

  onSubmit(){
    const data = new Date(this.form.value['data']);
    const newBoleto = new Boleto(
      this.editMode ? this.id : this.boletosService.generateNewId(),
      this.form.value['empresa'],
      data,
      this.form.value['valor'],
    )
    if(this.editMode){
      newBoleto.pago = this.boleto.pago;
      this.boletosService.updateBoleto(this.id, newBoleto);
    } else {
      this.boletosService.createBoleto(newBoleto);
    }
    this.router.navigate(['/boletos']);
  }
  onCancel(){
    this.router.navigate(['/boletos']);
  }
}
