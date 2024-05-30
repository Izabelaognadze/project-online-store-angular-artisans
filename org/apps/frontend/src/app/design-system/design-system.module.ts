import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDirective } from './input.directive';
import { ButtonDirective } from './button.directive';

@NgModule({
  declarations: [InputDirective, ButtonDirective],
  imports: [CommonModule],
  exports: [InputDirective, ButtonDirective],
})
export class DesignSystemModule {}
