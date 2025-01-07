import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../service/cart/cart.service';
import { FavoritesService } from '../../../service/favorites/favorites.service';
import { ProductsService } from '../../../service/products.service';

@Component({
  selector: 'app-landing',
  imports: [RouterModule, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  service = inject(ProductsService);
  cartService = inject(CartService)
  favService = inject(FavoritesService)
  router = inject(Router);
  
  cartCount: number = 6;
  products: any
  productList: any
  catergoriesList: any

  ngOnInit() {
    this.getAllCategories()
    
    this.cartCount = this.cartService.getCartCount();
  }
  
  onLogoOpen(){
    this.router.navigateByUrl('pro')
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

  onCardOpen(){
    this.router.navigateByUrl('cart')
    const cartItems = this.cartService.getCartItems();
  }

  onfavOpen(){
    this.router.navigateByUrl('fav')
  }    
}
