import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpService: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.httpService.get<Product[]>(`${environment.API_URL}/products`);
  }

  getProduct(id: string): Observable<Product> {
    return this.httpService.get<Product>(
      `${environment.API_URL}/products/${id}`
    );
  }

  getFeaturedProducts(count: number): Observable<Product[]> {
    return this.httpService.get<Product[]>(
      `${environment.API_URL}/products/get/featured/${count}`
    );
  }

  createProduct(product: FormData): Observable<Product> {
    return this.httpService.post<Product>(
      `${environment.API_URL}/products`,
      product
    );
  }

  updateProduct(id: string, product: FormData): Observable<Product> {
    return this.httpService.put<Product>(
      `${environment.API_URL}/products/${id}`,
      product
    );
  }

  deleteProduct(id: string): Observable<unknown> {
    return this.httpService.delete<unknown>(
      `${environment.API_URL}/products/${id}`
    );
  }
}
