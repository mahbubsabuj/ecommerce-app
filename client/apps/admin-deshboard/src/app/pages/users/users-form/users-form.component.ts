import { Component, OnInit } from '@angular/core';
import { Country, User, UsersService } from '@client/users';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
})
export class UsersFormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    street: new FormControl(''),
    apartment: new FormControl(''),
    city: new FormControl(''),
    zip: new FormControl(''),
    country: new FormControl(''),
    phone: new FormControl('', Validators.required),
    isAdmin: new FormControl(false, Validators.required),
  });
  isFormSubmitted = false;
  isEditingMode = false;
  countries: Country[] = [];
  id = '';
  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private locationService: Location,
    private activatedRouteService: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._checkEditMode();
    this._getCountries();
  }

  onFormSubmit() {
    this.isFormSubmitted = true;
    if (this.form.invalid) {
      return;
    }
    const user: User = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      street: this.form.controls['street'].value,
      apartment: this.form.controls['apartment'].value,
      city: this.form.controls['city'].value,
      zip: this.form.controls['zip'].value,
      country: this.form.controls['country'].value,
      phone: this.form.controls['phone'].value,
      isAdmin: this.form.controls['isAdmin'].value,
    };
    if (this.isEditingMode) {
      this._updateUser(user);
    } else {
      this._addUser(user);
    }
  }
  private _updateUser(user: User) {
    this.usersService.updateUser(this.id, user).subscribe({
      next: () => {
        this._successToast('user updated successfully');
        this._goBack();
      },
      error: () => {
        this._errorToast('user cannot be updated');
      },
    });
  }
  private _addUser(user: User) {
    this.usersService.addUser(user).subscribe({
      next: () => {
        this._successToast('user added successfully');
        this._goBack();
      },
      error: () => {
        this._errorToast('user cannot be added');
      },
    });
  }
  private _getCountries() {
    this.usersService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
        console.log(this.countries);
      },
    });
  }
  private _checkEditMode() {
    this.activatedRouteService.params.subscribe({
      next: (params) => {
        if (params['id']) {
          this.id = params['id'];
          this.isEditingMode = true;
          this.usersService.getUser(params['id']).subscribe({
            next: (response) => {
              this.id = params['id'];
              this.form.setValue({
                name: response.name,
                email: response.email,
                password: '',
                street: response.street,
                apartment: response.apartment,
                city: response.city,
                zip: response.zip,
                country: response.country,
                phone: response.phone,
                isAdmin: response.isAdmin,
              });
              this.form.controls['password'].setValidators([]);
              this.form.controls['password'].updateValueAndValidity();
            },
          });
        }
      },
    });
  }
  private _goBack() {
    timer(1500).subscribe(() => {
      this.locationService.back();
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
