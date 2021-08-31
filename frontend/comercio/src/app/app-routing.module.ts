import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoletoDetailComponent } from './boletos/boleto-detail/boleto-detail.component';
import { BoletosComponent } from './boletos/boletos.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/boletos', pathMatch: 'full' },
  {
    path: 'boletos',
    component: BoletosComponent,
    children: [
      { path: 'edit/:id', component: BoletoDetailComponent },
      { path: 'new', component: BoletoDetailComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/boletos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
