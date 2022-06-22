import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'client-product-page',
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent implements OnInit {
  product: Product | null = null;
  constructor(
    private productsService: ProductsService,
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
  
  private _getProduct(id: string) {
    this.productsService.getProduct(id).subscribe({
      next: (product) => {
        this.product = product;
      },
    });
  }
}
