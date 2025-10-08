import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Fields} from "../../models/fields.entity";
import {FieldsService} from "../../services/fields.service";
import {NgIf} from "@angular/common";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-field-form',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    FormsModule,
    MatInput,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  templateUrl: './field-form.component.html',
  styleUrl: './field-form.component.css'
})
export class FieldFormComponent implements OnInit{
  @Input() isModalOpen: boolean=true ;
  @Input() type:string = 'Add';
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
      if (this.fieldId) {
        this.fieldService.update(this.fieldId, this.field).subscribe((response: any) => {
          console.log('Field Updated', response);
          this.success.emit();
          this.resetForm();
          this.isModalOpen = false;
        });
      } else {
        console.log('Field', this.field);
        this.fieldService.create(this.field).subscribe((response: any) => {
          console.log('Field Created', response);
          this.success.emit();
          this.resetForm();
          this.isModalOpen = false;
        });
      }
    }
  }
  onCancel() {
    this.resetForm();
    this.isModalOpen = false;
    this.close.emit();
  }
}
