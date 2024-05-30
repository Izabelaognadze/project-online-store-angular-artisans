import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { DesignSystemModule } from './design-system/design-system.module';
import { ComponentsModule } from './components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { CustomerRoutingModule } from './customer/customer-routing.module';
import { CustomerModule } from './customer/customer.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { EmployeeRoutingModule } from './employee/employee-routing.module';
import { AdminModule } from './admin/admin.module';
import { EmployeeModule } from './employee/employee.module';
import { ItemPageComponent } from './item-page/item-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ItemPageComponent,
    CartPageComponent,
  ],
  imports: [
    BrowserModule,
    DesignSystemModule,
    ComponentsModule,
    HttpClientModule,
    NgxPaginationModule,
    CustomerModule,
    AdminModule,
    EmployeeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('app-auth-token');
        },
      },
    }),
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    CustomerRoutingModule,
    AdminRoutingModule,
    EmployeeRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
