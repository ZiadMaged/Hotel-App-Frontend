import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReservationsComponent } from './reservations/reservations.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/customers', pathMatch: 'full'
  },
  { 
    path: 'customers', component: CustomersComponent 
  },
  {
    path: 'customers/:id', component: CustomersComponent
  },
  {
    path: 'customers/:id/reservations', component: ReservationsComponent
  },
  { 
    path: 'customers/:id/reservations/:subId', component: ReservationsComponent 
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
