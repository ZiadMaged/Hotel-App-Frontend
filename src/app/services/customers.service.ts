import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CustomerItem } from '../models/customer-item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  url: string = "http://localhost:5000/api/";

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerItem[]>{
    return this.http.get<CustomerItem[]>(this.url + "customers/");  
  }

  getCustomerById(id: string): Observable<CustomerItem>{
    return this.http.get<CustomerItem>(this.url + "customers/" + id);  
  }

  createCustomer(customer: CustomerItem): Observable<CustomerItem>{
    let {id, ...customerObj} = customer;
    return this.http.post<CustomerItem>(this.url + "customers/", customerObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }

  updateCustomer(customer: CustomerItem): Observable<CustomerItem>{
    let {id, ...customerObj} = customer;
    return this.http.put<CustomerItem>(this.url + "customers/" + id, customerObj, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    });
  }

  deleteCustomer(id: string): Observable<string>{
    return this.http.delete<string>(this.url + "customers/" + id);
  }
}
