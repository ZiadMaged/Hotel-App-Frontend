import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { CustomersFormComponent } from './customer-form/customer-form.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    CustomersFormComponent,
    PageNotFoundComponent,
    ReservationsComponent,
    ReservationFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
