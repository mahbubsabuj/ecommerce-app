import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

export const ordersRoutes: Route[] = [{path: 'cart', component: CartPageComponent}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ordersRoutes), BadgeModule, ButtonModule, InputNumberModule, FormsModule],
  declarations: [CartIconComponent, CartPageComponent],
  exports: [CartIconComponent, CartPageComponent],
})
export class OrdersModule {
  constructor(private cartService: CartService) {
    this.cartService.initCart();
  }
}
