import { Component } from '@angular/core';
import { AuthService } from '@client/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}
  logOut() {
    this.authService.logOut();
  }
}
