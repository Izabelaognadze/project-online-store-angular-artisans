import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Customer, Employee, User, UserType } from '../shared/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'org-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userError = '';
  employeeError = '';
  registerCustomerGroup;
  registerEmployeeGroup;
  SuccessMessage = false;

  constructor(formBuilder: FormBuilder, private authService: AuthService) {
    this.registerCustomerGroup = formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

    this.registerEmployeeGroup = formBuilder.group({
      storeName: ['', Validators.required],
      storeTaxId: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  registerUser(user: User) {
    this.authService.register(user).subscribe(
      () => {
        this.SuccessMessage = true;
        setTimeout(() => {
          this.SuccessMessage = false;
        }, 5000);
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

  onCustomerRegister() {
    const value = this.registerCustomerGroup.value;
    if (!this.registerCustomerGroup.valid) {
      return;
    }
    const customer: Customer = {
      id: uuidv4(),
      email: value.email || '',
      password: value.password || '',
      firstName: value.firstName || '',
      lastName: value.lastName || '',
      userType: UserType.Customer,
    };

    this.registerUser(customer);
  }

  onEmployeeRegister() {
    const value = this.registerEmployeeGroup.value;
    if (!this.registerEmployeeGroup.valid) {
      return;
    }

    const employee: Employee = {
      id: uuidv4(),
      email: value.email || '',
      password: value.password || '',
      products: [],
      approved: false,
      firstName: value.firstName || '',
      lastName: value.lastName || '',
      storeName: value.storeName || '',
      storeTaxId: Number(value.storeTaxId),
      status: 1,
      userType: UserType.Employee || '',
    };

    this.registerUser(employee);
  }
}
