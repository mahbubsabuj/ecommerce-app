import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpService: HttpClient) {}
  getCategories(): Observable<Category[]> {
    return this.httpService.get<Category[]>(
      'http://localhost:4000/api/v1/categories'
    );
  }
  createCategory(category: Category): void {
    this.httpService.get<void>('http://localhost:4000/api/v1/categories');
  }
}
