import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesignSystemModule } from '../design-system/design-system.module';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DesignSystemModule,
    RouterModule,
    FormsModule,
  ],
  exports: [HeaderComponent, FooterComponent, SearchComponent],
})
export class ComponentsModule {}
