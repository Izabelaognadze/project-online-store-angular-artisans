import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { EmployeeComponent } from './employee/employee/employee.component';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path:'cartpage', component: CartPageComponent },
];
