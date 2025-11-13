import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import {
  AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import { MatTableDataSource } from "@angular/material/table";
import { AgriculturalProcessService } from "../../services/agricultural-process.service";
import { AgriculturalActivity } from "../../models/agricultural-activity.entity";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-crop-treatment-view',
  standalone: true,
  imports: [
    RouterLink,
    AgriculturalActivityTableComponent,
    TranslateModule
  ],
  templateUrl: './crop-treatment-view.component.html',
  styleUrl: './crop-treatment-view.component.css'
})
export class CropTreatmentViewComponent implements OnInit {

  dataSource: MatTableDataSource<AgriculturalActivity> =
    new MatTableDataSource<AgriculturalActivity>();

  displayedColumns: string[] = [
    'id',
    'date',
    'workersTotalCost',
    'activityStatus',
    'treatmentType',
    'resources'
  ];

  agriculturalProcessId!: number;

  private activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  private activityType: string = 'CROP_TREATMENT';

  ngOnInit(): void {
    this.loadFromRouteStateOrStorage();

    if (this.agriculturalProcessId) {
      this.getAllActivities();
    } else {
      console.warn('No agriculturalProcessId available for crop treatment history');
      this.dataSource.data = [];
    }
  }

  private loadFromRouteStateOrStorage(): void {
    const state = history.state;

    // 1️⃣ Preferimos state (HomeView → CropTreatment-history)
    if (state && state.agriculturalProcessId) {
      this.agriculturalProcessId = Number(state.agriculturalProcessId);

      // Opcional: respaldo
      localStorage.setItem('agriculturalProcessId', String(this.agriculturalProcessId));
      return;
    }

    // 2️⃣ Fallback: localStorage
    const id = localStorage.getItem('agriculturalProcessId');
    if (id) {
      this.agriculturalProcessId = Number(id);
    } else {
      this.agriculturalProcessId = 0;
      console.error('No agriculturalProcessId found in route state or localStorage (CropTreatment)');
    }
  }

  private getAllActivities(): void {
    this.activityService
      .getActivitiesByAgriculturalProcessId(this.agriculturalProcessId, this.activityType)
      .subscribe({
        next: (data: Array<AgriculturalActivity>) => {
          this.dataSource.data = data;
        },
        error: (err) => {
          console.warn(
            `Error fetching CROP_TREATMENT activities for process ${this.agriculturalProcessId}`,
            err
          );
          this.dataSource.data = [];
        }
      });
  }
}
