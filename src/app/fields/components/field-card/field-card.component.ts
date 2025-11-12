import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Fields } from "../../models/fields.entity";
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { FieldsService } from "../../services/fields.service";
import { NgIf } from "@angular/common";
import { Router } from "@angular/router";
import { AgriculturalProcessService } from "../../../agricultural-process/services/agricultural-process.service";
import { FieldFormEditComponent } from "../field-form-edit/field-form-edit.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatIcon } from "@angular/material/icon";

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
    FieldFormEditComponent,
    TranslateModule,
    MatIcon
  ],
  templateUrl: './field-card.component.html',
  styleUrls: ['./field-card.component.css']
})
export class FieldCardComponent {
  @Input() field!: Fields;
  @Output() deleteField = new EventEmitter<void>();
  @Output() editField = new EventEmitter<void>();
  isModalOpen = false;

  fieldService: FieldsService = inject(FieldsService);
  agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);

  constructor(private router: Router) {}

  // ✅ ahora recibe el objeto completo para tener el producerId
  onFieldDeleted(f: Fields): void {
    const producerId = f.producerId;
    if (producerId == null) {
      console.error('producerId es requerido para eliminar el field');
      return;
    }
    this.fieldService.delete(f.id, producerId).subscribe({
      next: () => {
        console.log(`Field ${f.id} eliminado`);
        this.deleteField.emit(); // que el padre recargue la lista
      },
      error: (err) => console.error('Error eliminando field:', err)
    });
  }

  openModal() { this.isModalOpen = true; }
  closeModal() { this.isModalOpen = false; }

  onEditSuccess() {
    this.editField.emit();
    this.closeModal();
  }

  findSeedingActivity(agriculturalProcessId: number) {
    this.agriculturalProcessService
      .getActivitiesByAgriculturalProcessId(agriculturalProcessId, "SEEDING")
      .subscribe({
        next: () => this.router.navigate(['home-agricultural-process', agriculturalProcessId]),
        error: () => this.router.navigate(["activity-scheduler/Seeding"])
      });
  }

  // 🔄 sin localStorage: navega pasando state (si necesitas esos datos)
  createAgriculturalProcess(fieldIdToCreate: number) {
    this.agriculturalProcessService.create({ fieldId: fieldIdToCreate }).subscribe({
      next: (response: any) => {
        // this.findSeedingActivity(response.id); // si lo quieres directo
        this.router.navigate(['home-agricultural-process', response.id], {
          state: {
            fieldId: this.field.id,
            fieldName: this.field.fieldName,
            agriculturalProcessId: response.id
          }
        });
      },
      error: (error) => console.error('Error creating agricultural process:', error)
    });
  }

  goToHome(fieldId: number) {
    this.agriculturalProcessService.getUnfinishedAgriculturalProcessByFieldId(fieldId).subscribe({
      next: (response: any) => {
        if (response && typeof response.id === 'number' && response.id > 0) {
          // Navega pasando state en lugar de usar localStorage
          this.router.navigate(['home-agricultural-process', response.id], {
            state: {
              fieldId: this.field.id,
              fieldName: this.field.fieldName,
              agriculturalProcessId: response.id
            }
          });
        } else {
          this.createAgriculturalProcess(fieldId);
        }
      },
      error: () => this.createAgriculturalProcess(fieldId)
    });
  }
}
