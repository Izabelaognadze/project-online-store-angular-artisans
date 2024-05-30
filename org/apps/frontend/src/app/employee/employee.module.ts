import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee/employee.component';
import { ComponentsModule } from '../components/components.module';
import { DesignSystemModule } from '../design-system/design-system.module';
import { EmployeeRoutingModule } from './employee-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DesignSystemModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [EmployeeComponent],
})
export class EmployeeModule {}
