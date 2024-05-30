import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../shared/services/items.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/models/product';
import { Employee } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'org-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  data: Product[] = [];
  public currentEmployee?: Employee;
  p = 1;

  constructor(
    private itemService: ItemsService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadData();
    if (this.authService.isUserSignedIn()) {
      this.currentEmployee = this.authService.getUserInfo();
    }
  }

  filterProduct(item : Product){
    return item.status === 1;
  }

  loadData(): void {
    this.route.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.itemService.getData().subscribe((result) => {
          this.data = result.filter((item: { name: string }) =>
            item.name
              .toLocaleLowerCase()
              .includes(params['searchTerm'].toLocaleLowerCase())
          ).filter(this.filterProduct);
        });
      } else {
        this.itemService.getData().subscribe((result) => {
          this.data = result.filter(this.filterProduct);
        });
      }
      console.log(params['searchTerm']);
    });
  }

  onPageChange(pageNumber: number): void {
    this.p = pageNumber || 1;
  }
}
