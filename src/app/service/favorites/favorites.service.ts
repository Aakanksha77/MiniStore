import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class FavoritesService {
//   private fav: any[] = [];

//   constructor() {
//     const storedfav = localStorage.getItem('fav');
//     this.fav = storedfav ? JSON.parse(storedfav) : [];
//   }

//   // Get all fav items
//   getfavItems(): any[] {
//     return this.fav;
//   }

//   // Add product to the fav, ensuring no duplicates
//   addTofav(product: any): { success: boolean; message: string } {
//     const existingProduct = this.fav.find((item) => item.id === product.id);

//     if (existingProduct) {
//       return { success: false, message: `The product "${product.title}" is already in the fav.` };
//     }

//     this.fav.push(product);
//     this.updateLocalStorage();
//     return { success: true, message: `The product "${product.title}" has been added to the fav.` };
//   }

//   // Get the total number of items in the fav
//   getfavCount(): number {
//     return this.fav.length;
//   }

 
//   updatefav(newfav: any[]): void {
//     this.fav = newfav;
//     localStorage.setItem('fav', JSON.stringify(this.fav)); // Update fav in localStorage
//   }
  


//   // Save the fav to local storage
//   private updateLocalStorage(): void {
//     localStorage.setItem('fav', JSON.stringify(this.fav));
//   }


// }

export class FavoritesService {
private fav: any[] = [];
  private favSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject to manage fav updates
  fav$ = this.favSubject.asObservable();

  constructor() {
    const storedfav = localStorage.getItem('fav');
    this.fav = storedfav ? JSON.parse(storedfav) : [];
    this.favSubject.next(this.fav); // Initialize BehaviorSubject with fav data
  }

  // Get all fav items
  getfavItems(): any[] {
    return this.fav;
  }

  // Add product to the fav, ensuring no duplicates
  addTofav(product: any): { success: boolean; message: string } {
    const existingProduct = this.fav.find((item) => item.id === product.id);

    if (existingProduct) {
      return { success: false, message: `The product "${product.title}" is already in the fav.` };
    }

    this.fav.push(product);
    this.updatefav(this.fav);
    return { success: true, message: `The product "${product.title}" has been added to the fav.` };
  }

  // Remove product from the fav
  removeFromfav(productId: any): void {
    this.fav = this.fav.filter((item) => item.id !== productId);
    this.updatefav(this.fav);
  }

  // Get the total number of items in the fav
  getfavCount(): number {
    return this.fav.length;
  }

  // Update the fav and notify subscribers
  private updatefav(newfav: any[]): void {
    this.fav = newfav;
    localStorage.setItem('fav', JSON.stringify(this.fav)); // Save to localStorage
    this.favSubject.next(this.fav); // Notify subscribers
  }
}