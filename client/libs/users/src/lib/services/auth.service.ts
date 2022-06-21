import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalstorageService,
    private routerService: Router
  ) {}
  logIn(email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(`${environment.API_URL}/users/login`, {
      email,
      password,
    });
  }
  logOut(): void {
    this.localStorageService.removeToken();
    this.routerService.navigateByUrl('/login');
  }
}
