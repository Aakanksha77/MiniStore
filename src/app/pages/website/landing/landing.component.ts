import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  service = inject(ProductsService);
  router = inject(Router);

  ngOnInit(): void {
    this.getproducts()
    this.getAllCategories()
    this.startAutoSlide()
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

  onCatergoryList(categoryName: string){
    console.log(categoryName);  
    this.router.navigateByUrl(`catergories/${categoryName}`);
  }

  images: string[] = [
    'https://media6.ppl-media.com/tr:dpr-2,dpr-2/mediafiles/ecomm/misc/1733820667_3_web.jpg',
    'https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/lips-makeup/lip-stick/modules/title-banner/update/1h25_clp_banners_lipstickmakeup_v2.jpg?rev=204a5a1b1f4646bb9475c7b16f2a42d1&cx=0.64&cy=0.84&cw=1320&ch=250&hash=947F0EA2D2A6991CB05160C0C312930E',
    'https://images-static.nykaa.com/uploads/5dc54ba5-f217-4879-ac79-001d29499014.jpg?tr=cm-pad_resize,w-1200',
    'https://media6.ppl-media.com/tr:dpr-2,dpr-2/mediafiles/ecomm/misc/1733820669_2_web.jpg',
    'https://publish-p33712-e119997.adobeaemcloud.com/content/dam/adityabirlafashionandretailprogram/homepage/fy-2024-2025/nov-24/18nov/plp/a20231118_Chillmodeactivated_Top%20Plp.jpg.transform/i1366x532/image.jpeg'
  ];
  currentIndex: number = 0;

  prevImage(): void {
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1; // Loop to the last image
    } else {
      this.currentIndex--;
    }
  }

  nextImage(): void {
    if (this.currentIndex === this.images.length - 1) {
      this.currentIndex = 0; // Loop to the first image
    } else {
      this.currentIndex++;
    }
  }

  autoSlideInterval: any
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }


  productByCategoryList: any[] = [];
  cart: any[] = [];
  cartCount: number = 0;

  constructor(private route: ActivatedRoute) {}

  

  addToCart(product: any) {
    // Add product to the cart
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartCount();
    alert(`${product.title} has been added to the cart.`);
    this.updateCartCount()
  }

  loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    console.log(storedCart);
    
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      this.updateCartCount();
    }
  }

  updateCartInLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  updateCartCount(): void {
    this.cartCount = this.cart.length;
    console.log(this.cartCount);
    
  }
}
