import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  ngOnInit(): void {
    this.loadCartItems();
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]')
    this.calculateCart();

  }

  loadCartItems(): void {
    const cartData = localStorage.getItem('cart');
    this.cartItems = cartData ? JSON.parse(cartData) : [];
  }

  calculateCart1() {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]'); // Retrieve cart data
    console.log('Cart Data:', cartData);
  
    if (cartData.length > 0) {
      this.totalItems = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
      this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
      // Calculate total items and price
      this.totalItems = cartData.length;
      this.totalPrice = cartData.reduce((sum: number, item: any) => sum + (item.price || 0), 0);
    } else {
      this.totalItems = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

      this.totalItems = 0;
      this.totalPrice = 0;
    }
  
    console.log('Total Items:', this.totalItems, 'Total Price:', this.totalPrice);
  }

  calculateCart() {
    this.totalItems = this.cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }


  calculateCart3() {
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]'); // Retrieve cart data
    console.log('Cart Data:', cartData);
  
    if (cartData.length > 0) {
      // Calculate total items and price
      this.totalItems = cartData.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0);
      this.totalPrice = cartData.reduce((sum: number, item: any) => sum + ((item.price || 0) * (item.quantity || 1)), 0);
    } else {
      // Default to 0 if cart is empty
      this.totalItems = 0;
      this.totalPrice = 0;
    }
  
    console.log('Total Items:', this.totalItems, 'Total Price:', this.totalPrice);
  }
  
  calculateCart2() {
    // Retrieve cart data from localStorage
    const cartData = JSON.parse(localStorage.getItem('cart') || '[]'); 
  
    // if (cartData.length > 0) {
    //   // Ensure quantity is defined for all items
    //   this.totalItems = cartData.reduce((sum: number, item: any) => sum + (item.quantity ?? 1), 0);
    //   this.totalPrice = cartData.reduce((sum: number, item: any) => sum + (item.price * (item.quantity ?? 1)), 0);
    // } else {
    //   // Default values for an empty cart
    //   this.totalItems = 0;
    //   this.totalPrice = 0;
    // }
  
    console.log('Total Items:', this.totalItems, 'Total Price:', this.totalPrice);
  }
  
  
  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateCart();
  }

  increaseQuantity(item: any): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem) {
      cartItem.quantity++;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.calculateCart();
    }
  }

  decreaseQuantity(item: any): void {
    const cartItem = this.cartItems.find((cartItem) => cartItem.id === item.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
      this.calculateCart();
    }
  }

  proceedToCheckout(): void {
    alert('Proceeding to checkout!');
  }
}