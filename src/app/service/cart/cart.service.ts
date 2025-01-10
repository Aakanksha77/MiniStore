import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class CartService {
//   private cart: any[] = [];

//   constructor() {
//     const storedCart = localStorage.getItem('cart');
//     this.cart = storedCart ? JSON.parse(storedCart) : [];
//   }

//   // Get all cart items
//   // getCartItems(): any[] {
//   //   return this.cart;
//   // }

//   // Add product to the cart, ensuring no duplicates
//   addToCart(product: any): { success: boolean; message: string } {
//     const existingProduct = this.cart.find((item) => item.id === product.id);

//     if (existingProduct) {
//       return { success: false, message: `The product "${product.title}" is already in the cart.` };
//     }

//     this.cart.push(product);
//     this.updateLocalStorage();
//     return { success: true, message: `The product "${product.title}" has been added to the cart.` };
//   }

//   // Get the total number of items in the cart
//   getCartCount(): number {
//     return this.cart.length;
//   }

 
//   // updateCart(newCart: any[]): void {
//   //   this.cart = newCart;
//   //   localStorage.setItem('cart', JSON.stringify(this.cart)); // Update cart in localStorage
//   // }
  


//   // Save the cart to local storage
//   private updateLocalStorage(): void {
//     localStorage.setItem('cart', JSON.stringify(this.cart));
//   }
// }



export class CartService {
  private cart: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>(this.cart); // BehaviorSubject for cart items
  cart$ = this.cartSubject.asObservable(); // Public observable for cart changes

  constructor() {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.cartSubject.next(this.cart); // Initialize the BehaviorSubject with the current cart
  }

  // Add product to cart
  addToCart(product: any):  { success: boolean; message: string } {
    const existingProduct = this.cart.find((item) => item.id === product.id);

    if (existingProduct) {
      return { success: false, message: `The product "${product.title}" is already in the cart.` };
    }

    this.cart.push(product);
    this.updateCart(this.cart);
    // this.updateLocalStorage();
    return { success: true, message: `The product "${product.title}" has been added to the cart.` };
    // this.cart.push(product);
    // this.updateCart(this.cart);
  }

  // Remove product from cart
  removeFromCart(productId: string): void {
    this.cart = this.cart.filter((item) => item.id !== productId);
    this.updateCart(this.cart);
  }

  // Update the cart and notify subscribers
  private updateCart(newCart: any[]): void {
    this.cart = newCart;
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart); // Notify subscribers
  }

  // Get cart count
  getCartCount(): number {
    return this.cart.length;
  }
}