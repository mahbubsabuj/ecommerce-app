import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject<Cart>(this.getCart());
  initCart() {
    const cartLocalStorage = localStorage.getItem('cart');
    if (cartLocalStorage) return;
    const cart: Cart = {
      items: [],
    };
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getCart(): Cart {
    const cartLocalStorage = localStorage.getItem('cart');
    if (cartLocalStorage) {
      const cart: Cart = JSON.parse(cartLocalStorage);
      return cart;
    }
    return { items: [] };
  }

  setCartItem(cartItem: CartItem, update = false): Cart {
    const cartLocalStorage = localStorage.getItem('cart');
    const emptyCart: Cart = { items: [] };
    let cart: Cart = emptyCart;
    if (cartLocalStorage) {
      cart = JSON.parse(cartLocalStorage);
    }
    const itemExists = cart.items.find(
      (item) => item.productId === cartItem.productId
    );
    if (!itemExists) {
      cart.items.push(cartItem);
    } else {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId && item.quantity) {
          if (update) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity += cartItem.quantity ? cartItem.quantity : 0;
          }
        }
      });
    }
    this.cart$.next(cart);
    localStorage.setItem('cart', JSON.stringify(cart));
    return cart;
  }
  deleteCartItem(id: string): void {
    const cart = this.getCart();
    const newCartItems = cart.items.filter((item) => item.productId !== id);
    cart.items = newCartItems;
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cart$.next(cart);
  }
}
