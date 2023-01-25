import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public grandTotal: number = 0;
  constructor() {}

  getProducts() {
    return this.productList.asObservable();
  }

  setProducts(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCartList(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    console.log('this.cartItemList', this.cartItemList);
  }

  removeCartItem(product: any) {
    this.cartItemList.map((element: any, index: any) => {
      if (product.id == element.id) {
        this.cartItemList.splice(index, 1);
      }
      return (this.grandTotal = this.grandTotal - element.price);
    });

    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  grandTotalPrice() {
    // let grandTotal = 0;
    this.cartItemList.map((element: any) => {
      this.grandTotal += element.price;
    });
    return this.grandTotal;
  }
}
