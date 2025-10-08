import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Fields} from "../../models/fields.entity";
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {FieldsService} from "../../services/fields.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-field-form-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './field-form-edit.component.html',
  styleUrl: './field-form-edit.component.css'
})
export class FieldFormEditComponent implements OnInit{
  @Input() isModalOpen: boolean=true ;
  @Input() fieldId!:number;
  @Input() currentUserId!:number;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  field!: Fields;
  @ViewChild('fieldForm', { static: false}) fieldForm!: NgForm;
  fieldService: FieldsService = inject(FieldsService);

  constructor() {
    this.field=new Fields({});
  }

  ngOnInit(): void {
    this.field.producerId= this.currentUserId;
  }
  private resetForm(){
    this.fieldForm.resetForm();
    this.field=new Fields({});
  }

  onSubmit() {
    if (this.fieldForm.form.valid) {
      this.fieldService.update(this.fieldId, this.field).subscribe((response: any) => {
        console.log("Field Updated", response);
        this.success.emit();
        this.resetForm();
        this.isModalOpen = false;
      });
    }
  }
  onCancel() {
    this.resetForm();
    this.isModalOpen = false;
    this.close.emit();
  }
}
