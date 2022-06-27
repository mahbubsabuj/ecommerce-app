import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartItem, CartService } from '@client/orders';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'client-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  quantity = 1;
  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this._getProduct(params['id']);
        }
      },
    });
  }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product?._id,
      quantity: this.quantity,
    };
    this.cartService.setCartItem(cartItem);
  }
  private _getProduct(id: string) {
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
      },
    });
  }
}
