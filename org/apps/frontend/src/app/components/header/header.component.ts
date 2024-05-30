import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'org-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isSignedIn = false;
  userName = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    if (this.authService.isUserSignedIn()) {
      this.isSignedIn = true;
      const user = this.authService.getUserInfo();

      this.userName = user.firstName + '  ' + user.lastName;
    }
  }
}
