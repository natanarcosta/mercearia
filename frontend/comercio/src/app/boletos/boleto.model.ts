export class Boleto {
  public id: number;
  public empresa: string;
  public vencimento: Date;
  public valor: number;
  public pago: boolean;

  constructor(id: number, empresa: string, data: Date, valor: number){
    this.id = id;
    this.empresa = empresa;
    this.vencimento = data;
    this.valor = valor;
    this.pago = false;
  }
}
