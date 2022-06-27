import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemDetails } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'client-cart-page',
  templateUrl: './cart-page.component.html',
})
export class CartPageComponent implements OnInit {
  quantity = 1;
  cartItemsDetails: CartItemDetails[] = [];
  constructor(
    private routerService: Router,
    private cartService: CartService,
    private ordersService: OrdersService
  ) {}
  ngOnInit(): void {
    this._getCartDetails();
  }
  backToShop() {
    this.routerService.navigateByUrl('/products');
  }
  deleteCartItem() {
    //
  }
  private _getCartDetails() {
    this.cartService.cart$.subscribe((cart) => {
      console.log('H', cart);
      cart.items.forEach((item) => {
        console.log(
          this.ordersService
            .getProduct(item.productId === undefined ? '' : item.productId)
            .subscribe({
              next: (product) => {
                this.cartItemsDetails.push({
                  product: product,
                  quantity: item.quantity ? item.quantity : 0,
                });
              },
            })
        );
      });
    });
  }
}
