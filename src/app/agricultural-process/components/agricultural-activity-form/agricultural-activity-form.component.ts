import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {ReactiveFormsModule, FormsModule, NgForm} from '@angular/forms';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {ResourceFormComponent} from "../resource-form/resource-form.component";
import {TranslateModule} from "@ngx-translate/core";


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

  @ViewChild('activityForm', {static: false}) activityForm!: NgForm;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.item = {};
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        this.activityType = params.get('activityType') || '';
        console.log('Activity Type', this.activityType);
      }
    )
    this._setItem();
  }

  _setItem() {
    switch (this.activityType) {
      case 'Seeding':
        this.item = {
          date: this.date,
          planType: '',
          quantityPlanted: '',
        }
        break;
      case 'Irrigation':
        this.item = {
          date: this.date,
          hoursIrrigated: '',
        }
        break;
      case 'CropTreatment':
        this.item = {
          date: this.date,
          treatmentType: '',
        }
        break;
      case 'Harvest':
        this.item = {
          date: this.date,
          quantityInKg: 0,
          pricePerKg: 0,
        }
        break;
      default:
        this.item = {};
    }
  }

  submitSeeding(item: any) {
    console.log('Adding seeding activity', item);
    try {
      this.activityService.addActivity(this.agriculturalProcessId, this.date, 0, item.plantType, item.quantityPlanted,
                                        '', 0, 0)
        .subscribe((response) => {
          console.log('Seeding activity added', response);
          this.success = true;
          this.resetForm();
          this.router.navigate(['home-agricultural-process', this.agriculturalProcessId]);
        })
    } catch (error) {
      console.error('Error adding seeding activity', error);
    }
  }

  submitIrrigation(item: any) {
    console.log('Adding irrigation activity', item);
    try {
      this.activityService.addActivity(this.agriculturalProcessId, this.date, item.hoursIrrigated, '', 0,
        '', 0, 0)
        .subscribe((response) => {
          console.log('Irrigation activity added', response);
          this.success = true;
          this.resetForm();
          this.activityId = response.id;
          this.newAgriProcessId = response.agriculturalProcessId;
          this.showResourceForm = true;
        })
    } catch (error) {
      console.error('Error adding irrigation activity', error);
    }
  }

  submitCropTreatment(item: any) {
    console.log('Adding crop treatment activity', item);
    try {
      this.activityService.addActivity(this.agriculturalProcessId, this.date, 0, '', 0,
        item.treatmentType, 0, 0)
        .subscribe((response) => {
          console.log('Crop treatment activity added', response);
          this.success = true;
          this.resetForm();
          this.activityId = response.id;
          this.newAgriProcessId = response.agriculturalProcessId;
          this.showResourceForm = true;
        })
    } catch (error) {
      console.error('Error adding crop treatment activity', error);
    }
  }

  submitHarvest(item: any) {
    console.log('Adding harvest activity', item);
    try {
      this.activityService.addActivity(this.agriculturalProcessId, this.date, 0, '', 0,
        '', item.quantityInKg, item.pricePerKg)
        .subscribe((response) => {
          console.log('Harvest activity added', response);
          this.success = true;
          this.resetForm();
          this.activityId = response.id;
          this.newAgriProcessId = response.agriculturalProcessId;
          this.showResourceForm = true;
        })
    } catch (error) {
      console.error('Error adding harvest activity', error);
    }
  }

  validateSubmit(item: any) {
    console.log('Validating item:', item);

    // Check if planType and quantityPlanted are present and valid
    if (item.plantType && item.quantityPlanted > 0) {
      console.log('Submitting seeding:', item);
      this.submitSeeding(item);
    }
    // Check if hoursIrrigated are present
    else if (item.hoursIrrigated) {
      console.log('Submitting irrigation:', item);
      this.submitIrrigation(item);
    }
    // Check if treatmentType is present
    else if (item.treatmentType) {
      console.log('Submitting crop treatment:', item);
      this.submitCropTreatment(item);
    }
    // Check if quantityInKg and pricePerKg are greater than 0
    else if (item.quantityInKg > 0 && item.pricePerKg > 0) {
      console.log('Submitting harvest:', item);
      this.submitHarvest(item);
    } else {
      console.log('No valid condition met for item:', item);
    }
  }


  onSubmit() {
    if (this.activityForm.valid) {
      console.log('Activity', this.activityForm.value);
      this.validateSubmit(this.activityForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.resetForm();
    this.success = false;
    this.router.navigate([`${this.activityType}-history`]);
  }

  private resetForm() {
    this.activityForm.reset();
  }

  handleClose() {
    this.showResourceForm = false;
  }
}
