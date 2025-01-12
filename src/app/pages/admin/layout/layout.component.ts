import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
 
  router = inject(Router);
  service = inject(ProductsService);

  catergoriesList: any;
  existingData: any
  ngOnInit() {
    this.getAllCategories()
    
    const storedData = localStorage.getItem('apiData');
    if (storedData) {
      this.existingData = JSON.parse(storedData);
    }
  }

  getAllCategories(){
    this.service.getAllCategorys().subscribe((result)=>{
      this.catergoriesList = result
      console.log(this.catergoriesList);
      
    })
  }

  onCatergoryList(categoryName: string){
    console.log(categoryName);  
    this.router.navigateByUrl(`catergories/${categoryName}`);
  }

  searchResults: any;
  onSearch(query: string){
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
      // this.openCard(productId); // Pass the ID to openCard
      console.log(productId);
      
    }
  
    console.log('Search Results:', this.searchResults);
  }

  onAboutUs(){
    this.router.navigateByUrl('About')
  }

  onContact(){
    this.router.navigateByUrl('Contact')
  }

  onUser(){

  }
}