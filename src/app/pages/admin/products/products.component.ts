import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  
  service = inject(ProductsService)

  ngOnInit() {


    this.getALLCategory();
    this.getALLProducts();
  }


  productObj: any = {
    "id": 0,
    "title": " ",
    "description": "",
    "category": "",
    "price": 0,
    "brand": "",
    "sku": "",
    "weight": 0,
    "warrantyInformation": "",
    "returnPolicy": "",
    "thumbnail": "",
  }

  categoryList: any
  getALLCategory() {
    this.service.getAllCategorys().subscribe(result => {
      this.categoryList = result
    })
  }

  productList: any
  products: any

  getALLProducts() {
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
  

  onSubmit(form: any) {
    // Get existing data from local storage
    const existingData = localStorage.getItem('apiData');
    let apiData = existingData ? JSON.parse(existingData) : [];

    // Generate a new ID
    const newId = apiData.length > 0 ? Math.max(...apiData.map((item: any) => item.id)) + 1 : 1;

    // Add the new product
    const newProductWithId = {
      id: newId,
      ...this.productObj,
    };
    apiData.push(newProductWithId);

    // Update local storage
    localStorage.setItem('apiData', JSON.stringify(apiData));

    console.log('New data added:', newProductWithId);

    // Reset the form
    form.reset();
    this.getALLProducts()
  }

  onEdit(item: any) {
    this.productObj = item
    this.openSidePanel()
  }

  onUpdate() {

    // Find the product by ID in the existing products array
    const productIndex = this.productList.findIndex((p: any) => p.id === this.productObj.id);

    if (productIndex !== -1) {
      // Update the product at the found index with the new data
      this.productList[productIndex] = { ...this.productObj };

      // Save the updated products list to localStorage
      localStorage.setItem('apiData', JSON.stringify(this.productList));

      // Optionally reset the form or show a success message
      alert('Product updated successfully!');
    }

  }


  onDelete(productId: number): void {
    if (confirm("Are you sure you want to delete this item?")) {
      // Retrieve existing local storage data
      const existingData = JSON.parse(localStorage.getItem('apiData') || '[]');
  
      // Mark the product as deleted
      const updatedData = existingData.map((product: any) => 
        product.id === productId ? { ...product, deleted: true } : product
      );
  
      // Save the updated data back to local storage
      localStorage.setItem('apiData', JSON.stringify(updatedData));
  
      // Update the product list to exclude deleted items
      this.productList = updatedData.filter((product: any) => !product.deleted);
  
      console.log('Product marked as deleted:', productId);
    }
  }
  
 

  openSidePanel() {
    this.isSidePanelVisible = true
   
  }

  closeSidePanel() {
    this.isSidePanelVisible = false
  }


}
