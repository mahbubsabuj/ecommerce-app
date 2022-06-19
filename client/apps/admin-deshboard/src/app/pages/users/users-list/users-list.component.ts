import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { User, UsersService } from '@client/users';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private routerService: Router
  ) {}
  ngOnInit(): void {
    this._getUsers();
  }
  updateUser(id: string) {
    this.routerService.navigateByUrl(`/users/form/${id}`);
  }
  deleteUser(id: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this user?',
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(id).subscribe({
          next: () => {
            this._successToast('user deleted successfully');
            this._getUsers();
          },
          error: () => {
            this._errorToast('user cannot be deleted');
          },
        });
      },
    });
  }
  private _getUsers() {
    this.usersService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => {
        console.log(error);
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
