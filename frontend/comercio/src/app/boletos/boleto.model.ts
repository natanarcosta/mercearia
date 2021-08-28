export class Boleto {
  public id: number;
  public empresa: string;
  public dataVencimento: Date;
  public valor: number;
  public pago: boolean;

  constructor(id: number, empresa: string, data: Date, valor: number){
    this.id = id;
    this.empresa = empresa;
    this.dataVencimento = data;
    this.valor = valor;
    this.pago = false;
  }
}
