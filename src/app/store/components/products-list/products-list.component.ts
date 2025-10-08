import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatNavList} from "@angular/material/list";
import {ProductCardComponent} from "../product-card/product-card.component";
import {Product} from "../../models/product.entity";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MatNavList,
    ProductCardComponent
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent {
  @Input() products: Array<Product> = [];
  @Input() showField!: number;
  @Output() edit = new EventEmitter<Product>(); // Emit event to edit a product

  // Method to emit the product to edit
  onEdit(product: Product) {
    this.edit.emit(product); // Emit the product to edit
  }

}
