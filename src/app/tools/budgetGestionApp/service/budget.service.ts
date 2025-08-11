import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Budget} from '../model/Budget';
import {Observable} from 'rxjs';
import {Customer} from '../../../customer/model/Customer';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private baseUrl = "http://localhost:8080/api/budget";

  constructor(private http: HttpClient) {
  }


  // Lecture
  getAllBudgets(): Observable<Budget[]> {
    return this.http.get<Budget[]>(`${this.baseUrl}`);
  }

   getBudgetById(id: number): Observable<Budget> {
     return this.http.get<Budget>(`${this.baseUrl}/${id}`);
   }

    getBudgetsByCustomerId(customerId: number): Observable<Budget[]> {
     return this.http.get<Budget[]>(`${this.baseUrl}?customerId=${customerId}`);
    }

   createBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}`, budget);
   }


  deleteBudget(budgetId: number): Observable<void> {
   return this.http.delete<void>(`${this.baseUrl}/${budgetId}`);
  }


  updateBudget( budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/${budget.id}`, budget);
  }

}
