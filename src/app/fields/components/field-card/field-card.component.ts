import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Fields} from "../../models/fields.entity";
import {MatCard, MatCardActions, MatCardContent, MatCardImage} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {FieldsService} from "../../services/fields.service";
import {NgIf} from "@angular/common";

import {Router} from "@angular/router";
import {FieldFormComponent} from "../field-form/field-form.component";
import {AgriculturalProcessService} from "../../../agricultural-process/services/agricultural-process.service";
import {FieldFormEditComponent} from "../field-form-edit/field-form-edit.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-field-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgIf,
    FieldFormComponent,
    FieldFormEditComponent,
    TranslateModule,
    MatIcon
  ],
  templateUrl: './field-card.component.html',
  styleUrl: './field-card.component.css'
})
export class FieldCardComponent {
  @Input() field!: Fields;
  @Output() deleteField = new EventEmitter<void>();
  @Output() editField = new EventEmitter<void>();
  isModalOpen: boolean = false;

  fieldService: FieldsService = inject(FieldsService);
  agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);

  constructor(private router: Router) {
  }

  onFieldDeleted(fieldId: number): void {
    this.fieldService.delete(fieldId).subscribe((response: any) => {
      console.log(`Field with ID ${fieldId} deleted successfully.`);
      this.deleteField.emit();
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onEditSuccess() {
    this.editField.emit();
    this.closeModal();
  }

  findSeedingActivity(agriculturalProcessId: number) {
    this.agriculturalProcessService.getActivitiesByAgriculturalProcessId(agriculturalProcessId, "SEEDING")
      .subscribe({
        next: (response: any) => {
          console.log('Seeding activity found:', response);
          this.router.navigate(['home-agricultural-process', agriculturalProcessId]);
        },
        error: (error) => {
          console.error('Error finding seeding activity:', error);
          this.router.navigate(["activity-scheduler/Seeding"]);
        }
      });
  }

  createAgriculturalProcess(fieldIdToCreate: number) {
    let item = {
      fieldId: fieldIdToCreate
    }
    this.agriculturalProcessService.create(item).subscribe({
      next: (response: any) => {
        localStorage.setItem('fieldName', this.field.fieldName);
        localStorage.setItem('fieldId', this.field.id.toString());
        localStorage.setItem('agriculturalProcessId', response.id);
        this.findSeedingActivity(response.id);
      },
      error: (error) => {
        console.error('Error creating agricultural process:', error);
      }
    })
  }

  goToHome(fieldId: number) {
    this.agriculturalProcessService.getUnfinishedAgriculturalProcessByFieldId(fieldId).subscribe({
      next: (response: any) => {
        // Verifica si response tiene un ID válido
        if (response && typeof response.id === 'number' && response.id > 0) {
          console.log('Proceso agrícola encontrado:', response.status);
          localStorage.setItem('fieldName', this.field.fieldName);
          localStorage.setItem('fieldId', this.field.id.toString());
          localStorage.setItem('agriculturalProcessId', response.id.toString());
          this.findSeedingActivity(response.id);
        } else {
          console.warn('No se encontró un proceso agrícola sin finalizar. Creando uno nuevo.');
          this.createAgriculturalProcess(fieldId);
        }
      },
      error: (error) => {
        console.error('Error al obtener el proceso agrícola sin finalizar:', error);
        // Si ocurre un error, maneja la creación del proceso como respuesta predeterminada
        this.createAgriculturalProcess(fieldId);
      }
    });
  }
}
