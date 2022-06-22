import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'client-featured-products',
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {
  subscriptions$: Subject<boolean> = new Subject<boolean>();
  featuredProducts: Product[] = [];
  constructor(private productsService: ProductsService) {}
  ngOnInit(): void {
    this._getFeaturedProducts();
  }
  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.unsubscribe();
  }
  private _getFeaturedProducts() {
    this.productsService
      .getFeaturedProducts(8)
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (featuredProducts) => {
          this.featuredProducts = featuredProducts;
          console.log(featuredProducts);
        },
      });
  }
}
