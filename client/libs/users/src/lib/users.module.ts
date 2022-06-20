import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { InputTextModule } from 'primeng/inputtext';

const usersRoutes: Route[] = [{ path: 'login', component: LoginComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(usersRoutes), InputTextModule],
  declarations: [LoginComponent],
})
export class UsersModule {}
