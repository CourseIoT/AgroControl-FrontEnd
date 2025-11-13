import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Product} from '../../models/product.entity';
import {ProductService} from '../../services/product.service';
import {NgClass, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    NgIf,
    MatIcon,
    MatLabel,
    MatProgressSpinner,
    NgClass,
    TranslateModule
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Input() showForm!: boolean;
  @Input() userId!: number;
  @Input() isEditMode: boolean = false;
  @Input() productToEdit?: Product;
  @ViewChild('productForm', { static: false }) protected productForm!: NgForm;
  productService: ProductService = inject(ProductService);
  @Output() close = new EventEmitter<void>();
  loading: boolean = false;
  success!: boolean;
  message!: string;
  product!: Product;

  constructor() {
    this.resetForm();
  }

  ngOnChanges() {
    if (this.isEditMode && this.productToEdit) {
      this.product = { ...this.productToEdit };
    } else {
      this.resetForm();
    }
  }

  private resetForm(): void {
    this.product = new Product({});
    this.productForm?.resetForm();
    this.message = '';
    this.loading = false;
  }

  private isValid = () => this.productForm?.valid;

  onImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    if (target) {
      target.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.isValid() && !this.loading) {
      this.loading = true;
      this.product.userId = this.userId;

      const productToUpdate = {
        "name": this.product.name,
        "quantityPerUnit": this.product.quantityPerUnit,
        "unitPrice": this.product.unitPrice,
        "quantity": this.product.quantity,
        "photoUrl": this.product.photoUrl
      }

      const request = this.isEditMode
        ? this.productService.update(this.product.id, productToUpdate)
        : this.productService.create(this.product);

      request.subscribe(
        (response) => {
          console.log(this.isEditMode ? 'Product updated: ' : 'Product created: ', response);
          this.message = this.isEditMode ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente';
          this.success = true;
          this.loading = false;

          // Auto cerrar después de 2 segundos
          setTimeout(() => {
            this.closeMessage();
          }, 2000);
        },
        (error) => {
          console.error(this.isEditMode ? 'Error updating product: ' : 'Error creating product: ', error);
          this.message = this.isEditMode ? 'Error al actualizar el producto' : 'Error al crear el producto';
          this.success = false;
          this.loading = false;
        }
      );
    }
  }

  onCancel() {
    if (!this.loading) {
      this.resetForm();
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit();
  }

  closeMessage() {
    this.message = '';
    this.resetForm();
    this.closePopup();
  }
}
