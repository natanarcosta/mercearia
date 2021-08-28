import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletoDetailComponent } from './boletos/boleto-detail/boleto-detail.component';
import { BoletosComponent } from './boletos/boletos.component';

const routes: Routes = [
  {path: '', redirectTo: '/boletos', pathMatch: 'full'},
  {path: 'boletos', component: BoletosComponent, children: [
    {path: 'edit/:id', component: BoletoDetailComponent},
    {path: 'new', component: BoletoDetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
