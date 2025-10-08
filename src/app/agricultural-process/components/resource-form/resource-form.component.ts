import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { WorkerService } from "../../../fields/services/worker.service";
import { ProductService } from "../../../store/services/product.service";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgForOf,
    TranslateModule,
  ],
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css'],
})
export class ResourceFormComponent implements OnChanges {
  @Input() showForm: boolean = false; // Control visibility of the form
  @Input() activityId!: number; // ID of the activity, required
  @Input() agriculturalProcessId!: number; // ID of the activity, required
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Event emitter to close the form

  @ViewChild('resourceForm', { static: false }) resourceForm!: NgForm;

  userId!: number; // ID of the user
  selectedOption: string = 'workers'; // Default selected option
  items: any[] = []; // Dropdown options
  currentResource = { // Current resource being added
    resourceId: null,
    description: '',
    cost: 0,
    quantity: 0,
    activityId: this.activityId,
    agriculturalProcessId: this.agriculturalProcessId,
  };
  resources: any[] = []; // List of added resources

  constructor(private workerService: WorkerService, private productService: ProductService,
              private agriculturalProcessService: AgriculturalProcessService) {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = parseInt(id);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('activityId' in changes && changes['activityId'].currentValue) {
      this.currentResource.activityId = this.activityId;
    }
    if ('showForm' in changes && changes['showForm'].currentValue) {
      this.updateOptions();
    }
    if ('agriculturalProcessId' in changes && changes['agriculturalProcessId'].currentValue) {
      this.currentResource.agriculturalProcessId = this.agriculturalProcessId;
    }
  }

  updateOptions(): void {
    this.items = [];
    if (this.selectedOption === 'workers') {
      this.workerService.getAllByUserId(this.userId).subscribe({
        next: (data) => {
          this.items = data;
        },
        error: (err) => console.error('Error loading workers:', err),
      });
    } else {
      this.productService.getAllByUserId(this.userId).subscribe({
        next: (data) => {
          this.items = data;
        },
        error: (err) => console.error('Error loading products:', err),
      });
    }
  }

  onOptionChange(): void {
    this.updateOptions();
    this.resetCurrentResource();
  }

  resetCurrentResource(): void {
    this.currentResource = {
      resourceId: null,
      description: '',
      cost: 0,
      quantity: 0,
      activityId: this.activityId,
      agriculturalProcessId: this.agriculturalProcessId,
    };
  }

  addResource(): void {
    if (this.resourceForm.valid) {
      const resourceCopy = { ...this.currentResource };
      this.resources.push(resourceCopy);
      this.resetCurrentResource();
    } else {
      console.error('Form is invalid.');
    }
  }

  removeResource(index: number): void {
    this.resources.splice(index, 1);
  }

  onSubmit(): void {
    if (this.resources.length !== 0) {
      if (this.selectedOption === 'workers') {
        this.resources.forEach((resource) => {
         this.agriculturalProcessService.addResourceToActivity(resource).subscribe(
            {
              next: () => {
                console.log('Worker with data:', resource, 'added to activity.');
                this.closePopup();
              },
              error: (err) => console.error('Error adding workers:', err),
            }
          )
        })
      } else {
        this.resources.forEach((resource) => {
          this.agriculturalProcessService.addResourceToActivity(resource).subscribe(
            {
              next: () => {
                console.log('Product with data:', resource, 'added to activity.');
                this.closePopup();
              },
              error: (err) => console.error('Error adding products:', err),
            }
          )
        });
      }
    }
  }

  closePopup(): void {
    this.showForm = false;
    this.close.emit();
  }
}
