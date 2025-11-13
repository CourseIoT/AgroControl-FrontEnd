import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule, FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {ResourceFormComponent} from "../resource-form/resource-form.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatSnackBarModule, MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-agricultural-activity-form',
  templateUrl: './agricultural-activity-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    NgIf,
    MatSelectModule,
    ResourceFormComponent,
    TranslateModule,
    MatSnackBarModule,
    MatIcon
  ],
  styleUrls: ['./agricultural-activity-form.component.css']
})
export class AgriculturalActivityFormComponent implements OnInit {
  @Input() agriculturalProcessId!: number;
  @Input() date!: string;

  activityType!: string;
  item: any;
  activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  activityId!: number;
  newAgriProcessId!: number;
  showResourceForm: boolean = false;

  success = false;
  successMessageKey: string | null = null;   // 👈 mensaje que mostraremos en HTML

  @ViewChild('activityForm', {static: false}) activityForm!: NgForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.item = {};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.activityType = params.get('activityType') || '';
        console.log('Activity Type', this.activityType);
      }
    );
    this._setItem();
  }

  get activityTitleKey(): string {
    switch (this.activityType) {
      case 'Seeding':       return 'agriculturalActivity.seedingTitle';
      case 'Irrigation':    return 'agriculturalActivity.irrigationTitle';
      case 'CropTreatment': return 'agriculturalActivity.cropTreatmentTitle';
      case 'Harvest':       return 'agriculturalActivity.harvestTitle';
      default:              return 'agriculturalActivity.activityTitle';
    }
  }

  private showError(messageKey: string) {
    this.snackBar.open(this.translate.instant(messageKey), 'OK', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
  }

  _setItem() {
    switch (this.activityType) {
      case 'Seeding':
        this.item = {
          date: this.date,
          plantType: '',
          quantityPlanted: '',
        };
        break;
      case 'Irrigation':
        this.item = {
          date: this.date,
          hoursIrrigated: '',
        };
        break;
      case 'CropTreatment':
        this.item = {
          date: this.date,
          treatmentType: '',
        };
        break;
      case 'Harvest':
        this.item = {
          date: this.date,
          quantityInKg: 0,
          pricePerKg: 0,
        };
        break;
      default:
        this.item = {};
    }
  }

  // ---------- SUBMITS ----------

  submitSeeding(item: any) {
    console.log('Adding seeding activity', item);
    this.activityService.addActivity(
      this.agriculturalProcessId,
      this.date,
      0,
      item.plantType,
      item.quantityPlanted,
      '',
      0,
      0
    ).subscribe({
      next: (response) => {
        console.log('Seeding activity added', response);
        this.success = true;
        this.successMessageKey = 'agriculturalActivity.seedingCreated';  // 👈
        this.resetForm();
        this.router.navigate(['home-agricultural-process', this.agriculturalProcessId]);
      },
      error: (error) => {
        console.error('Error adding seeding activity', error);
      }
    });
  }

  submitIrrigation(item: any) {
    console.log('Adding irrigation activity', item);
    this.activityService.addActivity(
      this.agriculturalProcessId,
      this.date,
      item.hoursIrrigated,
      '',
      0,
      '',
      0,
      0
    ).subscribe({
      next: (response) => {
        console.log('Irrigation activity added', response);
        this.success = true;
        this.successMessageKey = 'agriculturalActivity.irrigationCreated';  // 👈
        this.resetForm();
        this.activityId = response.id;
        this.newAgriProcessId = response.agriculturalProcessId;
        this.showResourceForm = true;
      },
      error: (error) => {
        console.error('Error adding irrigation activity', error);
      }
    });
  }

  submitCropTreatment(item: any) {
    console.log('Adding crop treatment activity', item);
    this.activityService.addActivity(
      this.agriculturalProcessId,
      this.date,
      0,
      '',
      0,
      item.treatmentType,
      0,
      0
    ).subscribe({
      next: (response) => {
        console.log('Crop treatment activity added', response);
        this.success = true;
        this.successMessageKey = 'agriculturalActivity.cropTreatmentCreated';  // 👈
        this.resetForm();
        this.activityId = response.id;
        this.newAgriProcessId = response.agriculturalProcessId;
        this.showResourceForm = true;
      },
      error: (error) => {
        console.error('Error adding crop treatment activity', error);
      }
    });
  }

  submitHarvest(item: any) {
    console.log('Adding harvest activity', item);
    this.activityService.addActivity(
      this.agriculturalProcessId,
      this.date,
      0,
      '',
      0,
      '',
      item.quantityInKg,
      item.pricePerKg
    ).subscribe({
      next: (response) => {
        console.log('Harvest activity added', response);
        this.success = true;
        this.successMessageKey = 'agriculturalActivity.harvestCreated';  // 👈
        this.resetForm();
        this.activityId = response.id;
        this.newAgriProcessId = response.agriculturalProcessId;
        this.showResourceForm = true;
      },
      error: (error) => {
        console.error('Error adding harvest activity', error);
      }
    });
  }

  // ---------- VALIDACIÓN ----------

  validateSubmit(item: any) {
    console.log('Validating item:', item);

    switch (this.activityType) {
      case 'Seeding':
        if (!item.plantType || !item.quantityPlanted || item.quantityPlanted <= 0) {
          this.showError('validation.formInvalid');
          return;
        }
        this.submitSeeding(item);
        break;

      case 'Irrigation':
        if (item.hoursIrrigated == null || item.hoursIrrigated <= 0) {
          this.showError('validation.positiveNumber');
          return;
        }
        this.submitIrrigation(item);
        break;

      case 'CropTreatment':
        if (!item.treatmentType) {
          this.showError('validation.requiredField');
          return;
        }
        this.submitCropTreatment(item);
        break;

      case 'Harvest':
        if (!item.quantityInKg || item.quantityInKg <= 0 ||
          !item.pricePerKg || item.pricePerKg <= 0) {
          this.showError('validation.formInvalid');
          return;
        }
        this.submitHarvest(item);
        break;

      default:
        this.showError('validation.formInvalid');
    }
  }

  onSubmit() {
    if (!this.date || this.date.trim() === '') {
      this.showError('validation.requiredDate');
      return;
    }

    if (!this.activityForm || !this.activityForm.valid) {
      this.showError('validation.formInvalid');
      console.log('Form is invalid', this.activityForm?.value);
      return;
    }

    console.log('Activity', this.activityForm.value);
    this.validateSubmit(this.activityForm.value);
  }

  onCancel() {
    this.resetForm();
    this.success = false;
    this.successMessageKey = null;
    this.router.navigate([`${this.activityType}-history`]);
  }

  private resetForm() {
    if (this.activityForm) {
      this.activityForm.resetForm();
    }
  }

  handleClose() {
    this.showResourceForm = false;
  }
}
