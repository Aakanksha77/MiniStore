import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-web-products',
  imports: [CommonModule],
  templateUrl: './web-products.component.html',
  styleUrl: './web-products.component.css'
})
export class WebProductsComponent {
  service = inject(ProductsService);
  router = inject(Router);

  ngOnInit(): void {
    this.getproducts()
    
  }
  

  products: any
  productList: any
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
}
