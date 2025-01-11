import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../../../service/cart/cart.service';
import { FavoritesService } from '../../../service/favorites/favorites.service';

@Component({
  selector: 'app-customer-favorites',
  imports: [CommonModule],
  templateUrl: './customer-favorites.component.html',
  styleUrl: './customer-favorites.component.css'
})
export class CustomerFavoritesComponent implements OnInit {
  cartService = inject(CartService)
  favService = inject(FavoritesService)
  
  favItems: any[] = [];
  favCount: number = 0;
  
  cartCount:any;
  showPopup: boolean = false;

  ngOnInit(): void {
    this.loadFavorites();

    // Subscribe to changes in the favorites list for real-time updates
    this.favService.fav$.subscribe((fav) => {
      this.favItems = fav;
      this.updateFavCount();
    });
  }

  loadFavorites(): void {
    this.favItems = this.favService.getfavItems();
    this.updateFavCount();
  }

  removeFromFav(item: any): void {
    this.favService.removeFromfav(item.id); // Use service to remove item
    console.log('Item removed from favorites:', item);
  }

  updateFavCount(): void {
    this.favCount = this.favItems.length; // Update the count dynamically
    console.log('Total Favorites:', this.favCount);
  }

  addToCart(product: any){
    const result = this.cartService.addToCart(product);

    if (result.success) {
      this.cartCount = this.cartService.getCartCount();
      this.showPopup = true;

      // Hide popup after 3 seconds
      setTimeout(() => {
        this.showPopup = false;
      }, 3000);
    }
    else {
      alert(result.message); // Replace with toast notification for better UX
    }
  }
  
}
