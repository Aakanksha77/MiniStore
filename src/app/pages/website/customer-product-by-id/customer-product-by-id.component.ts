import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../service/products.service';
import { CategoryProductsComponent } from '../category-products/category-products.component';

@Component({
  selector: 'app-customer-product-by-id',
  imports: [CommonModule],
  templateUrl: './customer-product-by-id.component.html',
  styleUrl: './customer-product-by-id.component.css'
})
export class CustomerProductByIdComponent {
  paramValue: any
  productById: any;
  productByIdTitle: any
  productByIdThumbnail: any
  productByIdPrice: any
  productByIdDescription: any
  productByIdDimensionsWidth: any;
  productByIdDimensionsHeight: any;
  productByIdDimensionsDepth: any;
  productReview: any
  productByIdRating: any

  currentIndex: number = 0;
  autoSlideInterval: any
  
  service = inject(ProductsService);
  router = inject(ActivatedRoute);


  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      this.paramValue = params.get('params'); // 'param' should match the route parameter name in your route configuration
      console.log(this.paramValue);
     
        this.getProductByIdResult(this.paramValue); // Fetch data for the category
    })
    this.startAutoSlide() 
  }
  
  getProductByIdResult(id: any) {
    this.service.getProductsById(id).subscribe((result) => {
  console.log(id);
      this.productById = result;
      this.productByIdTitle = this.productById.title;
      this.productByIdThumbnail = this.productById.images
      this.productByIdPrice = this.productById.price
      this.productByIdDescription = this.productById.description;
      this.productByIdDimensionsWidth = this.productById.dimensions.width;
      this.productByIdDimensionsHeight = this.productById.dimensions.height;
      this.productByIdDimensionsDepth = this.productById.dimensions.depth;
      // this.productByIdPrice = product.price;
      // this.productByIdCategory = product.category;
      this.productReview = this.productById.reviews
      this.productByIdRating = this.productById.rating;

    
      console.log(this.productById);
      this.getCategory(this.productById.category)
    })
  }

  activeTab: string = 'description';
  // Method to set the active tab
  setActiveTab(tabName: string): void {
    this.activeTab = tabName;
  }


  prevImage(){
    if (this.currentIndex === 0) {
      this.currentIndex = this.productByIdThumbnail.length - 1; // Loop to the last image
    } else {
      this.currentIndex--;
    }
  }

  nextImage(){
    if (this.currentIndex === this.productByIdThumbnail.length - 1) {
      this.currentIndex = 0; // Loop to the first image
    } else {
      this.currentIndex++;
    }
  }

  startAutoSlide(){
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  productByCategortResult: any
  productByCategortList: any
  getCategory(id: any){
    console.log(id);
    this.service.getProductByCategorys(id).subscribe((result)=>{
      this.productByCategortResult = result
      this.productByCategortList = this.productByCategortResult.products
      console.log(result); 
    })
  }
}
