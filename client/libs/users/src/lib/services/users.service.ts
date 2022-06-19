import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.API_URL}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.API_URL}/users/${id}`);
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${environment.API_URL}/users/`, user);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(
      `${environment.API_URL}/users/${id}`,
      user
    );
  }

  deleteUser(id: string): Observable<User> {
    return this.httpClient.delete<User>(`${environment.API_URL}/users/${id}`);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(`${environment.COUNTRY_API}`);
  }
}
