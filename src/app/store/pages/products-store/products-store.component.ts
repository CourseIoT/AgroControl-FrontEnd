import {Component, inject, OnInit} from '@angular/core';
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import {Product} from "../../models/product.entity";
import {ProductService} from "../../services/product.service";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-products-store',
  standalone: true,
  imports: [
    ProductsListComponent,
    TranslateModule,
    FormsModule,
    MatIcon,
    NgIf
  ],
  templateUrl: './products-store.component.html',
  styleUrl: './products-store.component.css'
})
export class ProductsStoreComponent implements OnInit{
  products: Array<Product> = [];
  filteredProducts: Array<Product> = [];
  productService: ProductService = inject(ProductService);
  userId!: number;
  searchTerm: string = '';

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
      this.filteredProducts = products;
      console.log(this.products);
    });
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  getAveragePrice(): string {
    if (this.products.length === 0) return '0.00';
    const sum = this.products.reduce((acc, product) => acc + product.unitPrice, 0);
    return (sum / this.products.length).toFixed(2);
  }

  openFormForEdit(event: any) {
    console.log("Dont have to do anything here");
  }
}
