import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements  OnInit {
  paramValue: any
  productByCategory: any;
  productByCategoryList: any
  productprice: any
  productthumbnail: any
  
  service = inject(ProductsService);
  router = inject(ActivatedRoute);


  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.paramValue = params.get('param'); // 'param' should match the route parameter name in your route configuration
      console.log(this.paramValue);

      
        this.getProductByCategorysResult(this.paramValue); // Fetch data for the category
     
  
    })
  
    
  }
  
  getProductByCategorysResult(id: any) {
    this.service.getProductByCategorys(id).subscribe((result) => {
  console.log(id);
      this.productByCategory = result;
      this.productByCategoryList = this.productByCategory.products
     
    
      console.log(this.productByCategoryList);
    
    })
  }

}
