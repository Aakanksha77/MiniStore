import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  service = inject(ProductsService)
  ngOnInit(): void {
    this.getproducts()
    this.getAllCategories()
  }
  menuActive: boolean = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
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

  catergoriesList: any
  getAllCategories(){
    this.service.getAllCategorys().subscribe((result)=>{
      this.catergoriesList = result
      console.log(this.catergoriesList);
      
    })
  }

  
}
