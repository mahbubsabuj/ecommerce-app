import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeshboardService } from '@client/deshboard';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.scss'],
})
export class DeshboardComponent implements OnInit, OnDestroy {
  subscriptions$: Subject<boolean> = new Subject<boolean>();
  userCount = 0;
  productCount = 0;
  orderCount = 0;
  totalSales = 0;
  constructor(private deshboardService: DeshboardService) {}
  ngOnInit(): void {
    this.deshboardService
      .getUsersCount()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (userCount) => {
          this.userCount = userCount.userCount;
          console.log(this.userCount);
        },
      });

    this.deshboardService
      .getProductsCount()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (productCount) => {
          this.productCount = productCount.productCount;
        },
      });

    this.deshboardService
      .getOrdersCount()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (orderCount) => {
          this.orderCount = orderCount.orderCount;
        },
      });

    this.deshboardService
      .getTotalSales()
      .pipe(takeUntil(this.subscriptions$))
      .subscribe({
        next: (totalSales) => {
          this.totalSales = totalSales.totalSales;
        },
      });
  }

  ngOnDestroy(): void {
    this.subscriptions$.next(true);
    this.subscriptions$.unsubscribe();
  }
}
