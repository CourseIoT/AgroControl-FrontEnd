import {Component, inject, OnInit} from '@angular/core';
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import {Product} from "../../models/product.entity";
import {ProductService} from "../../services/product.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-products-store',
  standalone: true,
  imports: [
    ProductsListComponent,
    TranslateModule
  ],
  templateUrl: './products-store.component.html',
  styleUrl: './products-store.component.css'
})
export class ProductsStoreComponent implements OnInit{
  products: Array<Product> = [];
  productService: ProductService = inject(ProductService);
  userId!: number;

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = parseInt(id);
      console.log(this.userId);
      this.getProducts(this.userId);
    }
  }

  getProducts(userId: number) {
    this.productService.getAllButNotByUserId(userId).subscribe((products: Array<Product>) => {
      this.products = products;
      console.log(this.products);
    });
  }

  openFormForEdit(event: any) {
    console.log("Dont have to do anything here");
  }
}
