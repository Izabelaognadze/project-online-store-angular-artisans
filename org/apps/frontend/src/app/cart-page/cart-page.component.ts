import { Component } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { CartService } from '../shared/services/cart-service.service';

@Component({
  selector: 'org-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  cart!: Cart;
  totalPrice = 0;
  SuccessMessage = false;

  constructor(private cartService: CartService) {
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
    this.totalPrice = this.cart.items.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.item.price;
    }, 0);
  }

  successMsg() {
    this.SuccessMessage = true;
    setTimeout(() => {
      this.SuccessMessage = false;
    }, 3000);
  }

  deleteFromCart(id: any): void {
    this.cartService.removeFromCart(id);
    this.setCart();
  }
}
