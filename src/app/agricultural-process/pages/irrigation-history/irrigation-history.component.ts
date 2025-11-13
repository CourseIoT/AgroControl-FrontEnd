import { Component, inject, OnInit } from '@angular/core';
import {
  AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import { AgriculturalActivity } from "../../models/agricultural-activity.entity";
import { MatTableDataSource } from "@angular/material/table";
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { AgriculturalProcessService } from "../../services/agricultural-process.service";
import { TranslateModule } from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-irrigation-history',
  standalone: true,
  imports: [
    AgriculturalActivityTableComponent,
    MatButtonModule,
    RouterLink,
    TranslateModule,
    MatIcon
  ],
  templateUrl: './irrigation-history.component.html',
  styleUrl: './irrigation-history.component.css'
})
export class IrrigationHistoryComponent implements OnInit {

  dataSource: MatTableDataSource<AgriculturalActivity> =
    new MatTableDataSource<AgriculturalActivity>();

  displayedColumns: string[] = [
    'id',
    'date',
    'workersTotalCost',
    'activityStatus',
    'hoursIrrigated',
    'resources'
  ];

  agriculturalProcessId!: number;

  private activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  private activityType: string = 'IRRIGATION';

  ngOnInit(): void {
    this.loadFromRouteStateOrStorage();

    if (this.agriculturalProcessId) {
      this.getAllActivities();
    } else {
      console.warn('No agriculturalProcessId available for irrigation history');
      this.dataSource.data = [];
    }
  }

  private loadFromRouteStateOrStorage(): void {
    const state = history.state;

    // 1️⃣ Preferimos lo que viene por state (desde HomeView)
    if (state && state.agriculturalProcessId) {
      this.agriculturalProcessId = Number(state.agriculturalProcessId);

      // Opcional: respaldo en localStorage por si recargas
      localStorage.setItem('agriculturalProcessId', String(this.agriculturalProcessId));
      return;
    }

    // 2️⃣ Fallback: intentamos leer de localStorage
    const id = localStorage.getItem('agriculturalProcessId');
    if (id) {
      this.agriculturalProcessId = Number(id);
    } else {
      this.agriculturalProcessId = 0;
      console.error('No agriculturalProcessId found in route state or localStorage (Irrigation)');
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
            `Error fetching IRRIGATION activities for process ${this.agriculturalProcessId}`,
            err
          );
          this.dataSource.data = [];
        }
      });
  }
}
