import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, ProductsService } from '@client/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
// import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit {
  categories: Category[] = [];
  isFormSubmitted = false;
  isEditingMode = false;
  id = '';
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    richDescription: new FormControl(''),
    image: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    countInStock: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    isFeatured: new FormControl(false, Validators.required),
  });

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private locationService: Location,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._checkEditMode();
    this._getCategories();
  }
  onFormSubmit() {
    //
  }
  private _checkEditMode() {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.isEditingMode = true;
          this.productsService.getProduct(params['id']).subscribe({
            next: () => {
              //
            },
            error: () => {
              //
            },
          });
        }
      },
    });
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      }
    })
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
