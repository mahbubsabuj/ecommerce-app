import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import {
  OrderCount,
  ProductCount,
  TotalSales,
  UserCount,
} from '../models/deshboard.model';

@Injectable({
  providedIn: 'root',
})
export class DeshboardService {
  constructor(private httpClient: HttpClient) {}
  getUsersCount(): Observable<UserCount> {
    return this.httpClient.get<UserCount>(
      `${environment.API_URL}/users/get/count`
    );
  }
  getProductsCount(): Observable<ProductCount> {
    return this.httpClient.get<ProductCount>(
      `${environment.API_URL}/products/get/count`
    );
  }

  getOrdersCount(): Observable<OrderCount> {
    return this.httpClient.get<OrderCount>(
      `${environment.API_URL}/orders/get/count`
    );
  }

  getTotalSales(): Observable<TotalSales> {
    return this.httpClient.get<TotalSales>(
      `${environment.API_URL}/orders/get/totalsales`
    );
  }
}
