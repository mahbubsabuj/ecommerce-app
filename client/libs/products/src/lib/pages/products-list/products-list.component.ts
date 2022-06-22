import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { Product } from '../../models/product.model';
import { CategoriesService } from '../../services/categories.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'client-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit, OnDestroy {
  subscriptions$: Subject<boolean> = new Subject<boolean>();
  products: Product[] = [];
  filtedProducts: Product[] = [];
  categories: Category[] = [];
  checked: boolean[] = [];
  isCategoryMode = false;
  id: string | null = null;
  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.id = params['id'];
          this.isCategoryMode = true;
        }
      },
    });
    this._getCategories();
    this._getProducts();
  }
  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.unsubscribe();
  }
  categoryFilter() {
    this.filtedProducts = [];
    this.checked.map((status, index) => {
      this.products.map((product) => {
        if (product.category._id === this.categories[index]._id && status) {
          this.filtedProducts.push(product);
        }
      });
    });
  }

  private _getProducts() {
    this.productsService
      .getProducts()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.filtedProducts = products;
          if (this.id) {
            this.filtedProducts = this.products.filter((product) => {
              return product.category._id === this.id;
            });
          }
        },
      });
  }
  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.checked = this.categories.map(() => {
            return false;
          });
        },
      });
  }
}
