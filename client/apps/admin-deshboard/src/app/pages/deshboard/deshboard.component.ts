import { Component, OnDestroy, OnInit } from '@angular/core';
import { DeshboardService } from '@client/deshboard';
import { interval, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'admin-deshboard',
  templateUrl: './deshboard.component.html',
  styleUrls: ['./deshboard.component.scss'],
})
export class DeshboardComponent implements OnInit, OnDestroy {
  subscription$: Subject<boolean> = new Subject<boolean>();
  userCount = 0;
  productCount = 0;
  orderCount = 0;
  totalSales = 0;
  constructor(private deshboardService: DeshboardService) {}
  ngOnInit(): void {
    this.deshboardService
      .getUsersCount()
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (userCount) => {
          this.userCount = userCount.userCount;
          console.log(this.userCount);
        },
      });
    this.deshboardService
      .getProductsCount()
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (productCount) => {
          this.productCount = productCount.productCount;
        },
      });
    this.deshboardService
      .getOrdersCount()
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (orderCount) => {
          this.orderCount = orderCount.orderCount;
        },
      });
    this.deshboardService
      .getTotalSales()
      .pipe(takeUntil(this.subscription$))
      .subscribe({
        next: (totalSales) => {
          this.totalSales = totalSales.totalSales;
        },
      });
    const timer = interval(1000);
    const timer2 = interval(1000);
    timer.pipe(takeUntil(this.subscription$)).subscribe((data) => {
      console.log(data);
    });
    timer2.pipe(takeUntil(this.subscription$)).subscribe((data) => {
      console.log(data + 10);
    });
  }
  cancel() {
    this.subscription$.next(true);
    this.subscription$.unsubscribe();
  }
  ngOnDestroy(): void {
    console.log(this.subscription$, 'YES');
    this.subscription$.next(true);
    this.subscription$.unsubscribe();
  }
}
