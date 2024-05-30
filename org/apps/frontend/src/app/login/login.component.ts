import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { UserType } from '../shared/models/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export interface Login {
  email: string;
  password: string;
}

@Component({
  selector: 'org-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginGroup;
  userError = '';
  constructor(
    formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginGroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser() {
    const value = this.loginGroup.value;
    if (this.loginGroup.valid && value.email && value.password) {
      this.authService.login(value.email, value.password).subscribe(
        (c) => {
          const redirect =
            c.user.userType === UserType.Admin
              ? '/admin/dashboard'
              : c.user.userType === UserType.Customer
              ? '/customer/dashboard'
              : '/employee/dashboard';
          this.router.navigate([redirect]);
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            this.userError = err.error;
            setTimeout(() => {
              this.userError = '';
            }, 3000);
          }
        }
      );
    }
  }
}
