import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer} from '../model/Customer';
import {Observable} from 'rxjs';
import {CustomerDetailComponent} from '../page/customer-detail/customer-detail.component';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = "http://localhost:8080/api/customer";

  constructor(private http:HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}`);
  }

  getCustomerById(id:number):Observable<Customer>{
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  createCustomer(customer:Customer):Observable<Customer>{
    return this.http.post<Customer>(`${this.baseUrl}`, customer);
  }

  deleteCustomer(customerId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${customerId}`);
  }

  updateCustomer(customer:Customer):Observable<Customer>{
    return this.http.put<Customer>(`${this.baseUrl}/${customer.id}`, customer);
  }
}
