import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@client/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private productsService: ProductsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private routerService: Router
  ) {}
  ngOnInit(): void {
    this._getProducts();
  }
  private _getProducts() {
    this.productsService.getProducts().subscribe({
      next: (response) => {
        this.products = response;
        console.log(this.products);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  updateProduct(id: string) {
    this.routerService.navigateByUrl(`/products/form/${id}`);
  }
  deleteProduct(id: string) {
    console.log(id);
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(id).subscribe({
          next: () => {
            this._successToast('Product deleted successfully');
            this._getProducts();
          },
          error: () => {
            this._errorToast('Product cannot be deleted');
          },
        });
      },
      reject: () => {
        //
      },
    });
  }
  private _successToast(message: string) {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: message,
    });
  }
  private _errorToast(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }
}
