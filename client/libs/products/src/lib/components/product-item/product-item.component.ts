import { Component, Input } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CartService } from '@client/orders';
import { Product } from '../../models/product.model';

@Component({
  selector: 'client-product-item',
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  @Input() product: Product | null = null;
  constructor(private cartService: CartService) {}
  addProudctToCart() {
    if (this.product) {
      this.cartService.setCartItem({
        productId: this.product._id,
        quantity: 1,
      });
    }
  }
}
