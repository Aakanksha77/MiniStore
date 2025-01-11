import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';

@Component({
  selector: 'app-customer-cart',
  imports: [CommonModule],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit {
  router = inject(Router);
  cartService = inject(CartService)
  
  cartItems: any[] = [];
 
  Price = 0;
  totalItems = 0;
  totalPrice = 0;

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cart) => {
      this.cartItems = cart; // Update cart items dynamically
      this.calculateCart(); // Recalculate totals
    });
    this.cartItems.forEach(item => {
          if (!item.quantity) {
            item.quantity = 1; // Default quantity to 1 if not set
          }
        });
    this.calculateCart();
  }

  calculateCart() {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.Price = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

    this.totalPrice = Math.floor(this.Price)
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item.id); // Remove item using service
  }

  increaseQuantity(item: any): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity = (cartItem.quantity || 0) + 1;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.calculateCart(); // Recalculate total items and price
      this.cartService.addToCart(cartItem); // Update cart via service
    }
  }

  decreaseQuantity(item: any): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--; // Decrement quantity
      this.cartService.addToCart(cartItem); // Update cart via service
    }
  }

  proceedToCheckout(): void {
    this.router.navigateByUrl('user')
  }
}