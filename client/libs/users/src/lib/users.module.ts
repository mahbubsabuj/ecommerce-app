import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

const usersRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes)],
  declarations: [LoginComponent],
})
export class UsersModule {}
