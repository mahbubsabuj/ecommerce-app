import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'client-categories-banner',
  templateUrl: './categories-banner.component.html',
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {
  subscriptions$: Subject<boolean> = new Subject<boolean>();
  categories: Category[] = [];
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.unsubscribe();
  }

  private _getCategories() {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          console.log(this.categories)
        },
      });
  }
}
