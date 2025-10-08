import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ProductFormComponent} from "../../components/product-form/product-form.component";
import {Product} from "../../models/product.entity";
import {ProductService} from "../../services/product.service";
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-products-inventory',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    ProductFormComponent,
    ProductsListComponent,
    NgIf,
    TranslateModule
  ],
  templateUrl: './products-inventory.component.html',
  styleUrl: './products-inventory.component.css'
})
export class ProductsInventoryComponent implements OnInit{
  showForm: boolean = false;
  products: Array<Product> = [];
  productService: ProductService = inject(ProductService);
  userId!: number;
  isEditMode: boolean = false;
  productToEdit?: Product;

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id != null) {
      this.userId = parseInt(id);
      this.getProducts();
    }
  }

  getProducts() {
    this.productService.getAllByUserId(this.userId).subscribe((products: Array<Product>) => {
      this.products = products;
      console.log(this.products);
    });
  }

  showPopup() {
    this.showForm = true;
  }

  handleClosed(event: any) {
    this.showForm = false;
    this.getProducts();
  }
  openFormForEdit(product: Product) {
    this.isEditMode = true;
    this.productToEdit = product;
    this.showForm = true;
  }

}
