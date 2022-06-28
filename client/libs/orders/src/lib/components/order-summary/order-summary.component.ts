import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'client-order-summary',
  templateUrl: './order-summary.component.html',
})
export class OrderSummaryComponent implements OnInit {
  totalPrice = 0;
  constructor(
    private cartService: CartService,
    private ordersService: OrdersService,
    private routerService: Router
  ) {}

  ngOnInit(): void {
    this._getOrderSummary();
  }
  navigateToCheckOutPage(): void {
    this.routerService.navigateByUrl('/checkout');
  }
  private _getOrderSummary() {
    this.cartService.cart$.pipe().subscribe((cart) => {
      this.totalPrice = 0;
      cart.items.forEach((item) => {
        this.ordersService
          .getProduct(item.productId || '')
          .pipe(take(1))
          .subscribe({
            next: (product) => {
              this.totalPrice += product.price * (item.quantity || 0);
            },
          });
      });
    });
  }
}
