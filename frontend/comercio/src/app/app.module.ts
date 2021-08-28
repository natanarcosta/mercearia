import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoletoDetailComponent } from './boletos/boleto-detail/boleto-detail.component';
import { BoletoListItemComponent } from './boletos/boleto-list-item/boleto-list-item.component';
import { BoletoListComponent } from './boletos/boleto-list/boleto-list.component';
import { BoletosComponent } from './boletos/boletos.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    BoletosComponent,
    HeaderComponent,
    BoletoListItemComponent,
    BoletoDetailComponent,
    BoletoListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
