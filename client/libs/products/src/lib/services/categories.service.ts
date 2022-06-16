import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpService: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.httpService.get<Category[]>(
      `${environment.API_URL}/categories`
    );
  }
  getCategory(id: string): Observable<Category> {
    return this.httpService.get<Category>(
      `${environment.API_URL}/categories/${id}`
    );
  }
  createCategory(category: Category): Observable<Category> {
    return this.httpService.post<Category>(
      `${environment.API_URL}/categories`,
      category
    );
  }
  updateCategory(id: string, category: Category): Observable<Category> {
    return this.httpService.put<Category>(`${environment.API_URL}/categories/${id}`, category);
  }
  deleteCategory(id: string): Observable<unknown> {
    return this.httpService.delete<unknown>(
      `${environment.API_URL}/categories/${id}`
    );
  }
}
