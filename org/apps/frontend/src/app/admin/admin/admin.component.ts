import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../shared/services/admin.service';
import { Employee } from '../../shared/models/user';

@Component({
  selector: 'org-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  employees: Employee[] = [];
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getAllUsers().subscribe((d) => {
      if (Array.isArray(d)) {
        this.employees = d.filter((employee) => employee.userType === 2);
      } else {
        if (d.userType === 2) {
          this.employees = [d];
        }
      }
    });
  }

  activateEmployee(employee: Employee) {
    employee.status = 2;
    this.updateEmployee(employee);
  }

  blockEmployee(employee: Employee) {
    employee.status = 1;
    this.updateEmployee(employee);
  }

  updateEmployee(employee: Employee) {
    this.adminService.updateEmployee(employee).subscribe((d) => {
      console.log(d);
    });
  }
}
