import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country, UsersService } from '@client/users';

@Component({
  selector: 'client-checkout-page',
  templateUrl: './checkout-page.component.html',
})
export class CheckoutPageComponent implements OnInit {
  isFormSubmitted = false;
  countries: Country[] = [];
  checkoutForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    apartment: new FormControl('', Validators.required),
    zip: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
  });
  constructor(
    private routerService: Router,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.usersService.getCountries().subscribe({
      next: (countries) => {
        this.countries = countries;
      },
    });
  }
  placeOrder() {
    this.isFormSubmitted = true;
    if (this.checkoutForm.invalid) return;
  }
  backToCart() {
    this.routerService.navigateByUrl('/cart');
  }
}
