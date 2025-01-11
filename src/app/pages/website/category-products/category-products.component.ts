import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';
import { FavoritesService } from '../../../service/favorites/favorites.service';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-category-products',
  imports: [CommonModule],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css'
})
export class CategoryProductsComponent implements OnInit {
  service = inject(ProductsService);
  cartService = inject(CartService)
  favService = inject(FavoritesService)
  activeRouter = inject(ActivatedRoute);
  router = inject(Router);

  paramValue: any
  productByCategory: any;
  productByCategoryList: any
  productprice: any
  productthumbnail: any

  cartCount: number = 0;
  cartCount1: number = 0;
  showPopup: boolean = false;
  showfavPopup: boolean = false;

  
  ngOnInit() {
    this.activeRouter.paramMap.subscribe(params => {
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
    })
  }

  openCard(id: any) {
    this.router.navigateByUrl(`productById/${id}`)
  }


  // Handle adding product to the cart
  addToCart(product: any) {
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
