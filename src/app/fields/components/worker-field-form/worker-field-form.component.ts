import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from "@ngx-translate/core";

import { Worker } from "../../models/worker.entity";
import { WorkerService } from "../../services/worker.service";

@Component({
  selector: 'app-worker-field-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatDialogModule,
    TranslateModule
  ],
  templateUrl: './worker-field-form.component.html',
  styleUrl: './worker-field-form.component.css'
})
export class WorkerFieldFormComponent {
  @Input() userId!: number;
  @Input() isModalOpen: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  @ViewChild('workerForm', { static: false }) workerForm!: NgForm;

  worker: Worker = new Worker({});
  private workerService: WorkerService = inject(WorkerService);

  private resetForm() {
    if (this.workerForm) {
      this.workerForm.resetForm();
    }
    this.worker = new Worker({});
  }

  onSubmit() {
    if (!this.workerForm?.form.valid) {
      return;
    }

    this.worker.producerId = this.userId;

    this.workerService.create(this.worker).subscribe({
      next: (response: any) => {
        console.log('Worker created', response);
        this.success.emit();
        this.resetForm();
        this.isModalOpen = false;
      },
      error: (err) => {
        console.error('Error creating worker', err);
      }
    });
  }

  onCancel() {
    this.resetForm();
    this.isModalOpen = false;
    this.close.emit();
  }
}
