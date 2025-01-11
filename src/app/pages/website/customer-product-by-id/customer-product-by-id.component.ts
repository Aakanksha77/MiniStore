import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';
import { FavoritesService } from '../../../service/favorites/favorites.service';
import { ProductsService } from '../../../service/products.service';

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

  productByCategortResult: any
  productByCategortList: any

  currentIndex: number = 0;
  autoSlideInterval: any;

  cartCount: number = 0;
  cartCount1: number = 0;
  showPopup: boolean = false;
  showfavPopup: boolean = false;
  
  service = inject(ProductsService);
  cartService = inject(CartService)
  favService = inject(FavoritesService)
  activeRouter = inject(ActivatedRoute);
  router = inject(Router);

  
  ngOnInit() {
    this.activeRouter.paramMap.subscribe(params => {
      this.paramValue = params.get('params'); // 'param' should match the route parameter name in your route configuration
      console.log(this.paramValue);
     
        this.getProductByIdResult(this.paramValue); // Fetch data for the category
    })
    this.startAutoSlide() 
  }
  
  getProductByIdResult(id: any) {
    this.service.getProductsById(id).subscribe((result) => {
      this.productById = result;
      this.productByIdTitle = this.productById.title;
      this.productByIdThumbnail = this.productById.images
      this.productByIdPrice = this.productById.price
      this.productByIdDescription = this.productById.description;
      this.productByIdDimensionsWidth = this.productById.dimensions.width;
      this.productByIdDimensionsHeight = this.productById.dimensions.height;
      this.productByIdDimensionsDepth = this.productById.dimensions.depth;
      this.productReview = this.productById.reviews
      this.productByIdRating = this.productById.rating;

      this.getCategory(this.productById.category)
    })
  }

  // Method to set the active tab
  activeTab: string = 'description';
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

  getCategory(id: any){
    console.log(id);
    this.service.getProductByCategorys(id).subscribe((result)=>{
      this.productByCategortResult = result
      this.productByCategortList = this.productByCategortResult.products
      console.log(result); 
    })
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
 
  // Handle adding product to the Favorite
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
