import { Component, EventEmitter, Output } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerItem } from '../models/customer-item';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomersFormComponent {
  customer: CustomerItem = new CustomerItem();
  @Output() customerEvent = new EventEmitter();

  constructor(private service: CustomersService, 
    private route: ActivatedRoute, private router: Router){
      this.refreshCustomers();
  }

  refreshCustomers() {
    let id: string | null = this.route.snapshot.paramMap.get('id'); 
    if(id)
      this.service.getCustomerById(id)
        .subscribe(res => {
          this.customer = res;
          this.customer.birthDate = this.customer.birthDate.split('T')[0]
        })
  }

  onSubmit(form: NgForm) {
    if (!this.customer.id) {
      this.insertRecord(this.customer, form);
    } 
    else
      this.updateRecord(this.customer, form); 
  }

  insertRecord(customer: CustomerItem, form: NgForm){
    this.service.createCustomer(customer).subscribe(_ => this.resetForm(form));
  }

  updateRecord(customer: CustomerItem, form: NgForm){    
    this.service.updateCustomer(customer).subscribe(_ => this.resetForm(form));      
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.customer = new CustomerItem();
    this.customerEvent.emit();
    this.router.navigate(['/customers']);
  }
}
