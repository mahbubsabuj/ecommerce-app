import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category } from '@client/products';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
})
export class CategoriesListComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private routerService: Router
  ) {}
  ngOnInit(): void {
    this._getCategories();
  }
  updateCategory(id: string) {
    this.routerService.navigateByUrl(`/categories/form/${id}`);
  }
  deleteCategory(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(id).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category deleted successfully',
            });
            this._getCategories();
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Success',
              detail: 'Category cannot be deleted',
            });
          },
        });
      },
      reject: () => {
        //
      },
    });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
