import { Injectable } from '@angular/core';
import { Cart } from '../models/Cart';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = new Cart();

  private storageKey = 'CartData';

  addToCart(item: any, amount: number): void {
    // Retrieve existing cart from local storage
    const existingCartDataString = localStorage.getItem(this.storageKey);
    if (existingCartDataString) {
      this.cart = JSON.parse(existingCartDataString);
    }

    // Check if the item is already in the cart
    const existingCartItem = this.cart.items.find(
      (cartItem) => cartItem.item.id === item.id
    );

    if (existingCartItem) {
      // If the item is already in the cart, increase its quantity
      existingCartItem.quantity += amount;
    } else {
      // If the item is not in the cart, add a new cart item
      this.cart.items.push(new CartItem(item, amount));
    }

    // Save the updated cart back to local storage
    const updatedCartDataString = JSON.stringify(this.cart);
    localStorage.setItem(this.storageKey, updatedCartDataString);
  }

  removeFromCart(itemId: any): void {
    this.cart.items = this.cart.items.filter(
      (cartItem) => cartItem.item.id !== itemId
    );
    const updatedCartDataString = JSON.stringify(this.cart);
    localStorage.setItem(this.storageKey, updatedCartDataString);
  }

  changeQuantity(itemId: number, quantity: number): void {
    const cartItem = this.cart.items.find((item) => item.item.id === itemId);
    if (!cartItem) return;
    cartItem.quantity = quantity;

    // Save the updated cart back to local storage
    const updatedCartDataString = JSON.stringify(this.cart);
    localStorage.setItem(this.storageKey, updatedCartDataString);
  }

  getCart(): Cart {
    const dataString = localStorage.getItem(this.storageKey);
    return dataString ? JSON.parse(dataString) : new Cart();
  }
}
