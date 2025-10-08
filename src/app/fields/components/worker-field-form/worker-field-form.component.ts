import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {NgIf} from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {Worker} from "../../models/worker.entity";
import {WorkerService} from "../../services/worker.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-worker-field-form',
  standalone: true,
  imports: [FormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    NgIf,
    MatDialogModule, TranslateModule],
  templateUrl: './worker-field-form.component.html',
  styleUrl: './worker-field-form.component.css'
})
export class WorkerFieldFormComponent {
  @Input() userId!: number; // Recibe el fieldId como input
  @Input() isModalOpen: boolean = false; // Recibe el isModalOpen como input
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  worker!: Worker;
  @ViewChild('workerForm', { static: false}) workerForm!: NgForm;
  workerService: WorkerService = inject(WorkerService);

  constructor() {
    this.worker = new Worker({});
  }

  private resetForm() {
    this.workerForm.resetForm();
    this.worker = new Worker({});
  }

  onSubmit() {
    if (this.workerForm.form.valid) {
      this.worker.producerId = this.userId;
      this.workerService.create(this.worker).subscribe((response: any) => {
        console.log('Worker created', response);
      })
      this.success.emit(); // Emitir evento al enviar
      this.resetForm();
      this.isModalOpen = false;
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.resetForm();
    this.isModalOpen = false;
    this.close.emit(); // Emitir evento al cerrar
  }

}
