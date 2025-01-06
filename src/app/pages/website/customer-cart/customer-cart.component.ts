import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';

@Component({
  selector: 'app-customer-cart',
  imports: [CommonModule],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent implements OnInit {
  cartItems: any[] = [];
  totalItems: number = 0;
  totalPrice: number = 0;
  cartService = inject(CartService)

  ngOnInit() {
    this.loadCartItems();
    this.cartItems.forEach(item => {
      if (!item.quantity) {
        item.quantity = 1; // Default quantity to 1 if not set
      }
    });
    this.calculateCart();
  }

  loadCartItems(): void {
    const cartData = localStorage.getItem('cart');
    this.cartItems = cartData ? JSON.parse(cartData) : [];
  }

  calculateCart() {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateCart();
  }

  increaseQuantity(item: any): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity = (cartItem.quantity || 0) + 1; // Increment quantity safely
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.calculateCart(); // Recalculate total items and price
      console.log(cartItem.quantity, "no error");
    }
  }
  
  decreaseQuantity(item: any): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--; // Safe decrement (does not go below 1)
      localStorage.setItem('cart', JSON.stringify(this.cartItems)); // Update localStorage
      this.calculateCart(); // Recalculate cart total if needed
    }
  }
  








  proceedToCheckout(): void {
    alert('Proceeding to checkout!');
  }
}