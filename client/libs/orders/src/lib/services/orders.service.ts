import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>(`${environment.API_URL}/orders`);
  }

  getOrder(id: string): Observable<Order> {
    return this.httpClient.get<Order>(`${environment.API_URL}/orders/${id}`);
  }
  updateOrderStatus(id: string, statusId: number): Observable<Order> {
    return this.httpClient.put<Order>(`${environment.API_URL}/orders/${id}`, {
      status: statusId,
    });
  }
  deleteOrder(id: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(
      `${environment.API_URL}/orders/${id}`
    );
  }
}
