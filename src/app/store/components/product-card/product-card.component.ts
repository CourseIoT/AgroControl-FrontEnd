import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Product} from "../../models/product.entity";
import {NgIf} from "@angular/common";
import {ProductStoredService} from "../../services/product-stored.service";
import {MatIcon} from "@angular/material/icon";
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, NgIf, MatIcon, FormsModule, MatFormField, MatInput, MatLabel, RouterLink, TranslateModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent implements OnInit{
  @Input() product!: Product;
  @Input() showField!: number;

  @Output() edit = new EventEmitter<void>();

  userId!: number;
  productService: ProductStoredService = inject(ProductStoredService);
  private cdr = inject(ChangeDetectorRef);

  showPopUp = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  purchasing = false;
  errorMessage = '';

  @ViewChild('productForm', { static: false }) productForm!: NgForm;
  item = {
    "productId": 0,
    "quantityProduct": 0,
    "userId": 0
  }

  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = parseInt(id);
      this.item.userId = this.userId;
    }
  }

  editProduct() {
    this.edit.emit();
  }

  buyProduct() {
    if (this.purchasing) return;

    this.purchasing = true;
    this.item.productId = this.productForm.value.productId;
    this.cdr.detectChanges();

    this.productService.create(this.item).subscribe(
      (response) => {
        console.log(response);
        this.purchasing = false;
        this.closePopup();
        this.showSuccessMessage = true;
        this.resetForm();
        this.cdr.detectChanges();

        // Auto cerrar después de 3 segundos
        setTimeout(() => {
          this.closeSuccessMessage();
        }, 3000);
      },
      (error) => {
        console.log(error);
        this.purchasing = false;
        this.closePopup();
        this.errorMessage = 'Ocurrió un error al procesar tu compra. Por favor intenta de nuevo.';
        this.showErrorMessage = true;
        this.cdr.detectChanges();
      }
    );
  }

  resetForm(){
    this.productForm?.reset();
    this.item = {
      "productId": 0,
      "quantityProduct": 0,
      "userId": this.userId
    }
  }

  closePopup() {
    this.showPopUp = false;
    this.resetForm();
    this.cdr.detectChanges();
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
}
