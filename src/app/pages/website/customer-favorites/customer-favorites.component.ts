import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../../service/favorites/favorites.service';

@Component({
  selector: 'app-customer-favorites',
  imports: [CommonModule],
  templateUrl: './customer-favorites.component.html',
  styleUrl: './customer-favorites.component.css'
})
export class CustomerFavoritesComponent implements OnInit {
  ngOnInit(): void {
    this.loadCartItems()
    this.favItems = JSON.parse(localStorage.getItem('fav') || '[]');
  }
  favItems: any[] = [];
  favCount: any;
  favService = inject(FavoritesService)

  loadCartItems(): void {
    const favData = localStorage.getItem('fav');
    this.favItems = favData ? JSON.parse(favData) : [];
  }

  removeFromFav1(item: any): void {
    this.favItems = this.favItems.filter((cartItem) => cartItem.id !== item.id);
    localStorage.setItem('fav', JSON.stringify(this.favItems));
    // this.calculateCart();
  }
  removeFromFav(item: any): void {
    // Filter out the item from the favorites array
    this.favItems = this.favItems.filter((favItem) => favItem.id !== item.id);
  
    // Save the updated list to localStorage
    localStorage.setItem('fav', JSON.stringify(this.favItems));
  
    // Optionally, you can update the favorites count or any other data if required
    this.updateFavCount();
  
    console.log('Item removed from favorites:', item);
  }
  
  // Method to update the count of favorite items (if you are showing it somewhere)
  updateFavCount(): void {
    const favCount = this.favItems.length; // Calculate the current number of items in favorites
    console.log('Total Favorites:', favCount);
  
    // Optionally, update a variable or UI component to reflect the updated count
    this.favCount = favCount;
  }
  
}
