import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@client/products';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
    color: new FormControl('#fff', Validators.required),
  });
  isFormSubmitted = false;
  isEditingMode = false;
  id = '';
  constructor(
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private locationService: Location,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._checkEditMode();
  }
  onFormSubmit() {
    this.isFormSubmitted = true;
    if (this.form.invalid) return;
    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value,
    };
    if (this.isEditingMode) {
      this._updateCategory(category);
    } else {
      this._createCategory(category);
    }
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(this.id, category).subscribe({
      next: () => {
        this._successToast('Category updated successfully');
        timer(1500).subscribe(() => {
          this.locationService.back();
        });
      },
      error: () => {
        this._errorToast('Category cannot be updated');
      },
    });
  }
  private _createCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe({
      next: () => {
        this._successToast('Category added successfully');
        timer(1500).subscribe(() => {
          this.locationService.back();
        });
      },
      error: () => {
        this._errorToast('Category cannot be added');
      },
    });
  }
  private _checkEditMode() {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.isEditingMode = true;
          this.categoriesService.getCategory(params['id']).subscribe({
            next: (category) => {
              this.id = params['id'];
              this.form.setValue({
                name: category.name,
                icon: category.icon,
                color: category.color,
              });
            },
          });
        }
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
