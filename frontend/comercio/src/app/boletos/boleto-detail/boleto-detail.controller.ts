import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BoletoDetailComponent } from "./boleto-detail.component";

@Injectable({providedIn: 'root'})
export class BoletoDetailController{
  constructor(private matDialog: MatDialog){}

  open(id?: number){
    return this.matDialog.open(BoletoDetailComponent, {data: {id}});
  }

}
