import { Component, OnInit } from '@angular/core';
import { Order, OrdersService, ORDER_STATUS_MAP } from '@client/orders';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders-detail',
  templateUrl: './orders-detail.component.html',
})
export class OrdersDetailComponent implements OnInit {
  orderStatus = ORDER_STATUS_MAP;
  order: Order | null = null;
  selectedIndex = this.orderStatus[0];
  id = '';
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this._getOrder(params['id']);
          this.id = params['id'];
        }
      },
    });
  }
  changeOrderStatus(statusId: number) {
    this.ordersService.updateOrderStatus(this.id, statusId).subscribe({
      next: () => {
        this._successToast('order status updated successfully');
      },
      error: () => {
        this._errorToast('oder status could not be updated');
      },
    });
  }
  private _getOrder(id: string) {
    this.ordersService.getOrder(id).subscribe({
      next: (order) => {
        this.order = order;
        this.selectedIndex = this.orderStatus[this.order.status];
      },
    });
  }
  private _successToast(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  private _errorToast(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
