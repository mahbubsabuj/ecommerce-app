import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'client-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  isFormSubmitted = false;
  authError = false;
  authMessage = 'Email or password are wrong!';
  constructor(
    private authService: AuthService,
    private localStorageService: LocalstorageService,
    private routerService: Router
  ) {}
  onFormSubmit() {
    this.isFormSubmitted = true;
    this.authService
      .logIn(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .subscribe({
        next: (user: User) => {
          this.authError = false;
          if (user.token) {
            this.localStorageService.setToken(user.token);
          }
          this.routerService.navigateByUrl('/');
        },
        error: (error: HttpErrorResponse) => {
          this.authError = true;
          if (error.status !== 400) {
            this.authMessage = 'Error in the Server, please try again later!';
          } else {
            this.authMessage = 'Email or password are wrong!';
          }
        },
      });
  }
}
