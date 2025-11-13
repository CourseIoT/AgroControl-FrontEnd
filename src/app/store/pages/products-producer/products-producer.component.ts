import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {Product} from "../../models/product.entity";
import {ProductService} from "../../services/product.service";
import {CommonModule, NgFor, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-products-producer',
  standalone: true,
  imports: [
    NgIf,
    MatIcon,
    CommonModule,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './products-producer.component.html',
  styleUrl: './products-producer.component.css'
})
export class ProductsProducerComponent implements OnInit{
  products: Array<Product> = [];
  productService: ProductService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  userId!: number;
  message: string = '';

  // Para el dialog de usar producto
  showUseDialog = false;
  selectedProduct: Product | null = null;
  quantityToUse: number = 1;
  usingProduct = false;

  // Mensajes
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';

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

  getTotalStock(): number {
    return this.products.reduce((sum, product) => sum + product.quantity, 0);
  }

  getTotalValue(): string {
    const total = this.products.reduce((sum, product) => sum + (product.unitPrice * product.quantity), 0);
    return total.toFixed(2);
  }

  getMaxQuantityToUse(): number {
    // Debe quedar al menos 1 unidad en stock
    return this.selectedProduct ? Math.max(0, this.selectedProduct.quantity - 1) : 0;
  }

  isValidQuantity(): boolean {
    if (!this.selectedProduct) return false;
    return this.quantityToUse > 0 && this.quantityToUse <= this.getMaxQuantityToUse();
  }

  openUseProductDialog(product: Product) {
    if (product.quantity <= 1) {
      this.errorMessage = 'No puedes usar este producto porque solo queda 1 unidad en stock.';
      this.showErrorMessage = true;
      this.cdr.detectChanges();
      return;
    }

    this.selectedProduct = product;
    this.quantityToUse = 1;
    this.showUseDialog = true;
    this.cdr.detectChanges();
  }

  closeUseDialog() {
    this.showUseDialog = false;
    this.selectedProduct = null;
    this.quantityToUse = 1;
    this.cdr.detectChanges();
  }

  useProduct() {
    if (!this.selectedProduct || this.usingProduct || !this.isValidQuantity()) return;

    this.usingProduct = true;
    this.cdr.detectChanges();

    const updateData = {
      action: "reduce",
      quantity: this.quantityToUse
    };

    this.productService.updateQuantity(this.selectedProduct.id, updateData).subscribe({
      next: (response: Product) => {
        console.log('Quantity updated:', response);
        this.usingProduct = false;
        this.closeUseDialog();
        this.showSuccessMessage = true;
        this.getProducts(this.userId);
        this.cdr.detectChanges();

        setTimeout(() => {
          this.closeSuccessMessage();
        }, 2000);
      },
      error: (error: any) => {
        console.error('Error updating quantity:', error);
        this.usingProduct = false;
        this.closeUseDialog();
        this.errorMessage = error.error?.message || 'Error al actualizar la cantidad del producto';
        this.showErrorMessage = true;
        this.cdr.detectChanges();
      }
    });
  }

  closeSuccessMessage() {
    this.showSuccessMessage = false;
    this.cdr.detectChanges();
  }

  closeErrorMessage() {
    this.showErrorMessage = false;
    this.errorMessage = '';
    this.cdr.detectChanges();
  }

  openFormForEdit(event: any) {
    console.log("Dont have to do anything here");
  }
}
