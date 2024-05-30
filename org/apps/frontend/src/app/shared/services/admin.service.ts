import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  url = 'http://localhost:3000/users';

  getAllUsers() {
    return this.http.get<Employee>(this.url);
  }

  constructor(private http: HttpClient) {}

  updateEmployee(employee: Employee) {
    return this.http.patch<Employee>(this.url + '/' + employee.id, {
      ...employee,
      password: undefined,
    });
  }
}
