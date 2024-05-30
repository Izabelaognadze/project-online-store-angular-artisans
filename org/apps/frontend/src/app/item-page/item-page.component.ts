import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../shared/services/items.service';
import { CartService } from '../shared/services/cart-service.service';

@Component({
  selector: 'org-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css'],
})
export class ItemPageComponent implements OnInit {
  item: any;
  amount = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private itemService: ItemsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        this.itemService.getData().subscribe((result) => {
          if (result) {
            this.item = result.find(
              (item: { id: any }) => item.id == params['id']
            )!;
            console.log(this.item.name);
          }
        });
      }
    });
  }

  addToCart() {
    console.log(this.item);
    this.cartService.addToCart(this.item, this.amount);
    this.router.navigateByUrl('/cartpage');
  }

  onAmountChange(newValue: number) {
    if (newValue < 1) {
      this.amount = 1;
    } else {
      this.amount = newValue;
    }
  }
}
