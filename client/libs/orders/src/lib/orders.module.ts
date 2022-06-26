import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';

export const ordersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule, RouterModule],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCart();
  }
}
