import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';
import { FavoritesService } from '../../../service/favorites/favorites.service';
import { ProductsService } from '../../../service/products.service';
import { CustomerHeaderComponent } from '../customer-header/customer-header.component';

@Component({
  selector: 'app-web-products',
  imports: [CommonModule, CustomerHeaderComponent],
  templateUrl: './web-products.component.html',
  styleUrl: './web-products.component.css'
})
export class WebProductsComponent {
  service = inject(ProductsService);
  cartService = inject(CartService)
  favService = inject(FavoritesService)
  router = inject(Router);

  productByCategoryList: any[] = []; // Example data
  cartCount: number = 0;
  cartCount1: number = 0;
  products: any
  productList: any
  showPopup: boolean = false;
  showfavPopup: boolean = false;

  ngOnInit() {
    this.getproducts()

    this.cartCount1 = this.favService.getfavCount();
  }

  getproducts() {
    this.service.getAllProducts().subscribe(result => {
      this.products = result;
      this.productList = this.products.products;

      // Retrieve existing local storage data
      const existingData = JSON.parse(localStorage.getItem('apiData') || '[]');

      // Use a map to ensure products are uniquely identified by ID
      const dataMap = new Map<number, any>();

      // Add local data to the map first (this includes local changes and deletions)
      existingData.forEach((localProduct: any) => {
        dataMap.set(localProduct.id, localProduct);
      });

      // Add API data to the map, but only if it doesn't conflict with local deletions
      this.productList.forEach((apiProduct: any) => {
        if (!dataMap.has(apiProduct.id) || !dataMap.get(apiProduct.id)?.deleted) {
          dataMap.set(apiProduct.id, apiProduct);
        }
      });

      // Convert the map back to an array
      const mergedData = Array.from(dataMap.values());

      // Save the final data to local storage
      localStorage.setItem('apiData', JSON.stringify(mergedData));

      // Update the product list in the component
      this.productList = mergedData.filter((product: any) => !product.deleted);

      console.log('Final product list after syncing with API:', this.productList);
    });
  }

  openCard(id:any){
    this.router.navigateByUrl(`productById/${id}`) 
  }

  // Handle adding product to the cart
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
 
  addTofav(product: any) {
    const result = this.favService.addTofav(product);
    if (result.success) {
      this.cartCount1 = this.favService.getfavCount();
      this.showfavPopup = true;
      setTimeout(() => {
        this.showfavPopup = false;
      }, 2000);
    }
    else {
      alert(result.message);
    }
  }

}
