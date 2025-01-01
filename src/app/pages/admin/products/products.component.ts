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
    this.getALLProducts()
  }

  onEdit(item: any){
    this.productObj = item
    this.openSidePanel()
  }

  onUpdate(){
   
      // Find the product by ID in the existing products array
      const productIndex = this.productList.findIndex((p:any) => p.id === this.productObj.id);
  
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
    // Ensure that this.products is an array before proceeding
    // if (!Array.isArray(this.products)) {
    //   console.error('Error: products is not an array!');
    //   return;
    // }
  
    // Remove the product by filtering out the product with the given ID
    if (confirm("Are you sure you want to delete this item?")) {
    const updatedProducts = this.productList.filter((product: any) => product.id !== productId);
  
    // Save the updated list back to localStorage
    localStorage.setItem('apiData', JSON.stringify(updatedProducts));
  
    // Update the local products array to reflect the changes
    this.productList = updatedProducts;
  
    console.log('Product deleted successfully!');
  }

  }
  

  // onFileSelect(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.productObj.thumbnail = reader.result as string; // Store Base64 image data
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  openSidePanel() {
    this.isSidePanelVisible = true
  }

  closeSidePanel() {
    this.isSidePanelVisible = false
  }


}


