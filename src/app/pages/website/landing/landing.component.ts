import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';
import { FavoritesService } from '../../../service/favorites/favorites.service';
import { ProductsService } from '../../../service/products.service';
import { CustomerFooterComponent } from '../customer-footer/customer-footer.component';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule, CustomerFooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  service = inject(ProductsService);
  cartService = inject(CartService)
  favService = inject(FavoritesService)
  router = inject(Router);

  cartCount: number = 6;
  products: any
  productList: any
  catergoriesList: any

  cartItems: any[] = [];
  searchResults: any[] = []; // To hold filtered products
  existingData: any[] = []; // To hold the products loaded from localStorage
  searchProductListResult: any
  searchProductList: any

  ngOnInit() {
    this.getAllCategories()

    // this.cartCount = this.cartService.getCartCount();
    this.cartService.cart$.subscribe((cart) => {
      this.cartCount = cart.length; // Update cart count dynamically
    });

    const storedData = localStorage.getItem('apiData');
    if (storedData) {
      this.existingData = JSON.parse(storedData);
    }

  }


  onLogoOpen() {
    this.router.navigateByUrl('pro')
  }

  getAllCategories() {
    this.service.getAllCategorys().subscribe((result) => {
      this.catergoriesList = result
      console.log(this.catergoriesList);

    })
  }

  onCatergoryList(categoryName: string) {
    console.log(categoryName);
    this.router.navigateByUrl(`catergories/${categoryName}`);
  }

  onCardOpen() {
    this.router.navigateByUrl('cart')

  }

  onfavOpen() {
    this.router.navigateByUrl('fav')
  }


  onSearch(query: string) {
    if (!query.trim()) {
      this.searchResults = []; // Clear results if query is empty
      return;
    }

    this.searchResults = this.existingData.filter((product: any) => {
      // Check if `product.name` exists before calling `toLowerCase`
      return product.title && product.title.toLowerCase().includes(query.toLowerCase()) || product.description && product.description.toLowerCase().includes(query.toLowerCase());
    });

    if (this.searchResults.length > 0) {
      const productId = this.searchResults[0].id; // Get the ID of the first matching product
      this.openCard(productId); // Pass the ID to openCard
    }

    console.log('Search Results:', this.searchResults);
  }

  openCard(id: any) {
    this.router.navigateByUrl(`productById/${id}`)
  }

  onUser() {
    this.router.navigateByUrl('user')
  }

  onAboutUs() {
    this.router.navigateByUrl('About')
  }

  onContact() {
    this.router.navigateByUrl('Contact')
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const navbarLinks = document.querySelector('.navbar-links');
    if (navbarLinks) {
      navbarLinks.classList.toggle('active', this.menuOpen);
    }
  }

  categoriesList: string[] = ['electronics', 'fashion', 'home-decor', 'sports', 'beauty'];  // Example category list

}
