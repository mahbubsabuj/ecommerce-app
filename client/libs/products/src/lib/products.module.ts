import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, ButtonModule],
  declarations: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent],
  exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent],
})
export class ProductsModule {}
