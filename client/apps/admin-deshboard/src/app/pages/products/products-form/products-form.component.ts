import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category, ProductsService } from '@client/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
})
export class ProductsFormComponent implements OnInit {
  categories: Category[] = [];
  isFormSubmitted = false;
  isEditingMode = false;
  imageDisplay: string | ArrayBuffer | null = '';
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
    this.isFormSubmitted = true;
    if (this.form.invalid) return;
    const productFormData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      productFormData.append(key, this.form.controls[key].value);
    });
    if (this.isEditingMode) {
      this._updateProduct(productFormData);
    } else {
      this._addProduct(productFormData);
    }
  }
  private _addProduct(product: FormData) {
    this.productsService.createProduct(product).subscribe({
      next: () => {
        this._successToast('product added successfully');
        this._goBack();
      },
      error: () => {
        this._errorToast('product cannot be added');
      },
    });
  }
  private _updateProduct(product: FormData) {
    this.productsService.updateProduct(this.id, product).subscribe({
      next: () => {
        this._successToast('product updated successfully')
        this._goBack();
      },
      error: () => {
        this._errorToast('product cannot be updated')
      }
    })
  }
  private _goBack() {
    timer(1500).subscribe(() => {
      this.locationService.back();
    });
  }
  private _checkEditMode() {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.isEditingMode = true;
          this.id = params['id'];
          this.productsService.getProduct(params['id']).subscribe({
            next: (response) => {
              this.form.controls['name'].setValue(response.name);
              this.form.controls['description'].setValue(response.description);
              this.form.controls['richDescription'].setValue(
                response.richDescription
              );
              this.form.controls['image'].setValue(response.image);
              this.form.controls['brand'].setValue(response.brand);
              this.form.controls['category'].setValue(response.category._id);
              this.form.controls['price'].setValue(response.price);
              this.form.controls['countInStock'].setValue(
                response.countInStock
              );
              this.form.controls['isFeatured'].setValue(response.isFeatured);
              this.imageDisplay = response.image;
            },
            error: () => {
              //
            },
          });
        }
      },
    });
  }
  onImageUpload(event: Event) {
    const files = (event.target as HTMLInputElement).files;

    const fileReader = new FileReader();
    if (files) {
      fileReader.onload = () => {
        this.form.controls['image'].setValue(files[0]);
        this.form.controls['image'].updateValueAndValidity();
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(files[0]);
    }
  }
  private _getCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
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
