import {Component, inject, OnInit} from '@angular/core';
import {Product} from "../../models/product.entity";
import {ProductService} from "../../services/product.service";
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-products-producer',
  standalone: true,
  imports: [
    ProductsListComponent,
    NgIf
  ],
  templateUrl: './products-producer.component.html',
  styleUrl: './products-producer.component.css'
})
export class ProductsProducerComponent implements OnInit{
  products: Array<Product> = [];
  productService: ProductService = inject(ProductService);
  userId!: number;
  message: string = '';

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = parseInt(id);
      this.getProducts(this.userId);
    }
  }

  getProducts(userId: number) {
    this.productService.getAllByUserId(userId).subscribe((products: Array<Product>) => {
      this.products = products;
      console.log(this.products);
      if (this.products.length === 0) {
        this.message = 'No products found';
      }
    });
  }

  openFormForEdit(event: any) {
    console.log("Dont have to do anything here");
  }

}
