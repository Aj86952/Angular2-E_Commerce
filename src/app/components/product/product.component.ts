import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  allProductList: any = [];
  filterCategoryList: any = [];
  productTitle: any;
  searchText: any;
  loading: boolean = false;
  totalItem: number = 0;

  constructor(
    private productService: DataService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.getProductsList();
    this.cartService.getProducts().subscribe((res: any) => {
      this.totalItem = res.length;
    });
  }

  getProductsList() {
    this.loading = true;
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.allProductList = res;
        this.filterCategoryList = res;
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  allFilterList() {
    this.loading = true;
    this.getProductsList();
    this.loading = false;
  }

  filterFashionList() {
    this.allProductList = this.filterCategoryList;
    this.allProductList = this.allProductList.filter(
      (item: any) =>
        item.category == "men's clothing" || item.category == "women's clothing"
    );
    if (this.allProductList.length == 0) {
      this.allProductList = this.filterCategoryList;
    }
    console.log('this.ProductList', this.allProductList);
  }

  filterList(itemCategory: any) {
    this.loading = true;
    console.log('category', itemCategory);
    this.allProductList = this.filterCategoryList;
    this.allProductList = this.allProductList.filter(
      (element: any) => element.category == itemCategory
    );
    console.log('allProductList', this.allProductList);
    if (this.allProductList.length == 0) {
      this.allProductList = this.filterCategoryList;
    }
    this.loading = false;
  }

  addToCart(itemList: any) {
    this.cartService.addToCartList(itemList);
  }
}
