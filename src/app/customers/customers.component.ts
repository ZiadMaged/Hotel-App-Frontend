import { Component } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { CustomerItem } from '../models/customer-item';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: CustomerItem[] = [];

  constructor(private service: CustomersService){
    this.refreshCustomers();
  }

  refreshCustomers(){
    this.service.getCustomers().subscribe((value) => {
      console.error("refresh!", {value})
      this.customers = value;
    })
  }

  onDelete(id: string) {
    if (confirm("Are you sure you want to delete this record?")) {
      this.service.deleteCustomer(id)
      .subscribe( res => {
        this.refreshCustomers();
      },
      err => {
        console.log(err);
      })
    }
  }
 
}
