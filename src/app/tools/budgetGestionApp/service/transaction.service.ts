import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private baseUrl = "http://localhost:8080/api/transaction";

  constructor(private http: HttpClient) { }

  getAllTransactions():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}`);
  }

  getTransactionById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}/${id}`);
  }

  getTransactionsByBudgetId(budgetId: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.baseUrl}?budgetId=${budgetId}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.baseUrl}`, transaction);
  }

  deleteTransaction(transactionId: number): Observable<Transaction> {
    return this.http.delete<Transaction>(`${this.baseUrl}/${transactionId}`);
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${transaction.id}`, transaction);
  }
}
