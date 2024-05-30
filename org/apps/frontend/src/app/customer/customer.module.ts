import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { DesignSystemModule } from '../design-system/design-system.module';
import { ComponentsModule } from '../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    NgxPaginationModule,
    DesignSystemModule,
    ComponentsModule,
  ],
  exports: [CustomerComponent],
})
export class CustomerModule {}
