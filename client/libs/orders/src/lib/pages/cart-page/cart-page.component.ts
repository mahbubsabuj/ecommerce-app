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
  cartCount = 1;
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
  deleteCartItem(id: string) {
    this.cartService.deleteCartItem(id);
  }
  updateCartItemQuantity(cartItemDetails: CartItemDetails) {
    this.cartService.setCartItem(
      {
        productId: cartItemDetails.product._id,
        quantity: cartItemDetails.quantity,
      },
      true
    );
  }
  private _getCartDetails() {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItemsDetails = [];
      this.cartCount = cart.items.length;
      cart.items.forEach((item) => {
        this.ordersService
          .getProduct(item.productId === undefined ? '' : item.productId)
          .subscribe({
            next: (product) => {
              this.cartItemsDetails.push({
                product: product,
                quantity: item.quantity ? item.quantity : 0,
              });
            },
          });
      });
    });
  }
}
