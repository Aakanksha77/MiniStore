import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Constant } from './constant/constant';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(Constant.API_END_POINT)
  }

  getAllCategorys(){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_ALL_CATEGORY)
  }

  getProductByCategorys(categoryName: string){
    return this.http.get(Constant.API_END_POINT + Constant.METHODS.GET_PRODUCT_CATEGORY + categoryName)
  }

  getProductsById(id: any){
    return this.http.get(Constant.API_END_POINT +'/'+ id)
  }
}
