import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cart: any[] = []; // Stores cart items

  addToCart(product: any): void {
    this.cart.push(product);
    this.updateCartInLocalStorage();
  }

  getCartItems(): any[] {
    return this.cart;
  }

  getCartCount(): number {
    return this.cart.length;
  }

  private updateCartInLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }
}
