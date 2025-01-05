import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cart: any[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
  }

  // Get all cart items
  getCartItems(): any[] {
    return this.cart;
  }

  // Add product to the cart, ensuring no duplicates
  addToCart(product: any): { success: boolean; message: string } {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      return { success: false, message: `The product "${product.name}" is already in the cart.` };
    }

    this.cart.push(product);
    this.updateLocalStorage();
    return { success: true, message: `The product "${product.name}" has been added to the cart.` };
  }

  // Get the total number of items in the cart
  getCartCount(): number {
    return this.cart.length;
  }

  // Save the cart to local storage
  private updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
