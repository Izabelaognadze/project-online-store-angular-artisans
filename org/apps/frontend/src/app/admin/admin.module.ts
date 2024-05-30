import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { ComponentsModule } from '../components/components.module';
import { DesignSystemModule } from '../design-system/design-system.module';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DesignSystemModule,
    ComponentsModule,
  ],
  exports: [AdminComponent],
})
export class AdminModule {}
