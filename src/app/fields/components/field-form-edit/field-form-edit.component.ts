import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

// ✅ Componentes standalone Material
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { Fields } from '../../models/fields.entity';
import { FieldsService } from '../../services/fields.service';

@Component({
  selector: 'app-field-form-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    TranslateModule,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './field-form-edit.component.html',
  styleUrls: ['./field-form-edit.component.css']
})
export class FieldFormEditComponent implements OnInit {
  @Input() isModalOpen = false;
  @Input() field!: Fields;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();

  @ViewChild('fieldForm', { static: false }) fieldForm!: NgForm;

  saving = false;

  constructor(private fieldsService: FieldsService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.saving || !this.field?.id) return;

    this.saving = true;

    this.fieldsService.update(this.field.id, this.field).subscribe({
      next: () => {
        this.saving = false;
        this.success.emit();
        this.isModalOpen = false;
      },
      error: (e) => {
        console.error('Error updating field', e);
        this.saving = false;
      }
    });
  }

  onCancel() {
    this.isModalOpen = false;
    this.close.emit();
  }
}
