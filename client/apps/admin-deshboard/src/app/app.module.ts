import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DeshboardComponent } from './pages/deshboard/deshboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import { CategoriesService } from '@client/products';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      { path: 'deshboard', component: DeshboardComponent },
      { path: 'categories', component: CategoriesListComponent },
      {path: 'categories/form', component: CategoriesFormComponent}
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    ShellComponent,
    SidebarComponent,
    DeshboardComponent,
    CategoriesListComponent,
    CategoriesFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    InputTextModule
  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
