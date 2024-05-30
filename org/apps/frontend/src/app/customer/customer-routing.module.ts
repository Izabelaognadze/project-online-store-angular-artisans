import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: 'customer',
    children: [
      { path: 'dashboard', component: CustomerComponent},
      { path:'dashboard/search/:searchTerm', component:CustomerComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),NgxPaginationModule ],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
