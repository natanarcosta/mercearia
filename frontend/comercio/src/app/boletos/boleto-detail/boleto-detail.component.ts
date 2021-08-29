import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boleto } from '../boleto.model';
import { BoletosService } from '../boletos.service';

@Component({
  selector: 'app-boleto-detail',
  templateUrl: './boleto-detail.component.html',
  styleUrls: ['./boleto-detail.component.css'],
})
export class BoletoDetailComponent implements OnInit {
  id!: number;
  boleto!: Boleto;
  form: FormGroup = new FormGroup({
    empresa: new FormControl('', Validators.required),
    vencimento: new FormControl(null, Validators.required),
    valor: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/),
    ]),
  });
  //editMode determina se o formulário que abrirá estará em branco (criar boleto) ou com dados para editar um boleto existente.
  editMode: boolean = false;

  constructor(
    private boletosService: BoletosService,
    private matDialogRef: MatDialogRef<BoletoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: {id:number}
  ) {}

  ngOnInit(): void {
    if(this.data?.id) {
      this.editMode = true;
      this.boletosService.getBoletoById(this.data.id).subscribe((boleto) => {
        this.boleto = boleto;
        this.form.patchValue(this.boleto);
      });
    }
    /* this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
    }); */
  }

  onSubmit() {
    const newBoleto = new Boleto(
      0,
      this.form.value['empresa'],
      this.form.value['vencimento'],
      parseInt(this.form.value['valor'])
    );
    console.log(newBoleto);
    if (this.data?.id) {
      newBoleto.pago = this.boleto.pago;
      this.boletosService.updateBoleto(this.data.id, newBoleto).subscribe(() => {this.matDialogRef.close(newBoleto)});
    } else {

      this.boletosService
        .createBoleto(newBoleto)
        .subscribe(() => this.matDialogRef.close());
    }
  }

  onCancel() {
    //Passando o boleto para não quebrar o .afterclosed subscribe em outro componente
    this.matDialogRef.close(this.boleto);
  }
}
