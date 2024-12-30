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


  productObj: any = {
    // "id": 0,
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

  ngOnInit() {
    this.getALLCategory();
    this.getALLProducts();
  }

  getALLProducts() {
    this.service.getAllProducts().subscribe(result => {
      this.products = result
      this.productList = this.products.products
      console.log(this.productList);


      // Retrieve existing data from local storage
      const existingData = JSON.parse(localStorage.getItem('apiData') || '[]');

      // Merge API data with local storage data
      const mergedData = [...existingData, ...this.productList.filter((apiProduct: any) =>
        !existingData.some((localProduct: any) => localProduct.id === apiProduct.id)
      )];

      // Save merged data to local storage
      localStorage.setItem('apiData', JSON.stringify(mergedData));

      // Update product list in the component
      this.productList = mergedData;

      console.log('Merged product list:', this.productList);
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
  }









  openSidePanel() {
    this.isSidePanelVisible = true
  }

  closeSidePanel() {
    this.isSidePanelVisible = false
  }


}


