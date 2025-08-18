import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = "http://localhost:8080/api/category";

  constructor(private http:HttpClient) { }

  getAllCategories(): Observable<Category[]>{
    return  this.http.get<Category[]>(`${this.baseUrl}`)
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/${id}`)
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/`, category);
  }

  deleteCategory(categoryId : number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${categoryId}`);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category);
  }
}
