import { Component, OnInit } from '@angular/core';
import { Order, OrdersService, ORDER_STATUS_MAP } from '@client/orders';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-orders-list',
  templateUrl: './orders-list.component.html',
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  orderStatus = ORDER_STATUS_MAP;
  constructor(
    private ordersService: OrdersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private routerService: Router
  ) {}
  ngOnInit(): void {
    this._getOrders();
  }

  showOrder(id: string) {
    console.log(id);
    this.routerService.navigateByUrl(`orders/${id}`)
  }
  deleteOrder(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this order?',
      header: 'Delete Order',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.ordersService.deleteOrder(id).subscribe({
          next: () => {
            this._getOrders();
            this._successToast('order deleted successfully');
          },
          error: () => {
            this._errorToast('order cannot be deleted');
          },
        });
      },
    });
  }
  private _getOrders() {
    this.ordersService.getOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
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
