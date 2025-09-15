import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SubCategory} from '../model/SubCategory';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  private baseUrl = "http://localhost:8080/api/subcategory";
  constructor(private http: HttpClient) { }

  getAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.baseUrl}`);
  }

  getSubCategoriesByCategoryId(categoryId: number){
    return this.http.get<SubCategory[]>(`${this.baseUrl}/${categoryId}`);
  }

  createSubCategory(category: SubCategory){
    return this.http.post<SubCategory>(`${this.baseUrl}`,category);
  }

  deleteSubCategory(subCategoryId: any ) :Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${subCategoryId}`);
  }

  updateSubCategory(category: SubCategory){
    return this.http.put<SubCategory>(`${this.baseUrl}/${category.id}`,category);
  }



}
