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
    MatButton,
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
  //#region Attributes
  @Input() showForm!: boolean;
  @Input() userId!: number;
  @Input() isEditMode: boolean = false; // Nueva propiedad
  @Input() productToEdit?: Product; // Producto a editar
  @ViewChild('productForm', { static: false }) protected productForm!: NgForm;
  productService: ProductService = inject(ProductService);
  @Output() close = new EventEmitter<void>();
  loading: boolean = false;
  success!: boolean;
  message!: string;
  product!: Product; // Producto que se está creando o editando

  //#endregion Attributes

  constructor() {
    this.resetForm();
  }

  ngOnChanges() {
    if (this.isEditMode && this.productToEdit) {
      this.product = { ...this.productToEdit }; // Clonar el producto a editar
    } else {
      this.resetForm(); // Resetear el formulario si no está en modo edición
    }
  }

  private resetForm(): void {
    this.product = new Product({});
    this.productForm?.resetForm();
    this.message = '';
  }

  private isValid = () => this.productForm.valid;

  onSubmit() {
    if (this.isValid() && !this.loading) {
      this.loading = true;
      this.product.userId = this.userId;

      console.log('Product: ', this.product);

      const productToUpdate = {
        "name": this.product.name,
        "quantityPerUnit": this.product.quantityPerUnit,
        "unitPrice": this.product.unitPrice,
        "quantity": this.product.quantity,
        "photoUrl": this.product.photoUrl
      }

      // Lógica para crear o actualizar
      const request = this.isEditMode
        ? this.productService.update(this.product.id, productToUpdate) // Llama al método de actualización
        : this.productService.create(this.product); // Llama al método de creación

      // Simulate loading delay of 3 seconds
      setTimeout(() => {
        request.subscribe(
          (response) => {
            console.log(this.isEditMode ? 'Product updated: ' : 'Product created: ', response);
            this.message = this.isEditMode ? 'Product updated successfully' : 'Product created successfully';
            this.resetForm();
            this.success = true; // Indicate success
          },
          (error) => {
            console.error(this.isEditMode ? 'Error updating product: ' : 'Error creating product: ', error);
            this.message = this.isEditMode ? 'Error updating product' : 'Error creating product';
            this.success = false; // Indicate failure
          },
          () => {
            this.loading = false; // Ensure loading is false at the end of the request
          }
        );
      }, 3000); // Delay of 3 seconds
    }
  }

  onCancel() {
    this.resetForm();
    this.closePopup();
  }

  closePopup() {
    this.close.emit();
  }
}
