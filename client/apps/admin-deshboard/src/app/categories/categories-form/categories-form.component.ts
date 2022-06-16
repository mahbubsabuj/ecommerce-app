import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@client/products';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
})
export class CategoriesFormComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    icon: new FormControl('', Validators.required),
  });
  isFormSubmitted = false;
  constructor(private categoriesService: CategoriesService){}
  onFormSubmit() {
    this.isFormSubmitted = true;
    if (this.form.invalid) return;
    const category: Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
    }
    this.categoriesService.createCategory(category);
  }
}
