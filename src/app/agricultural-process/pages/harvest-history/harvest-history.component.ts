import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { AgriculturalProcessService } from "../../services/agricultural-process.service";
import { AgriculturalActivity } from "../../models/agricultural-activity.entity";
import {
  AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import { RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-harvest-history',
  standalone: true,
  imports: [
    AgriculturalActivityTableComponent,
    RouterLink,
    TranslateModule,
    MatIcon
  ],
  templateUrl: './harvest-history.component.html',
  styleUrl: './harvest-history.component.css'
})
export class HarvestHistoryComponent implements OnInit {

  dataSource: MatTableDataSource<AgriculturalActivity> =
    new MatTableDataSource<AgriculturalActivity>();

  displayedColumns: string[] = [
    'id',
    'date',
    'workersTotalCost',
    'pricePerKg',
    'quantityInKg',
    'totalIncome',
    'resources'
  ];

  agriculturalProcessId!: number;

  private activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  private activityType: string = 'HARVEST';

  ngOnInit(): void {
    this.loadFromRouteStateOrStorage();

    if (this.agriculturalProcessId) {
      this.getAllActivities();
    } else {
      console.warn('No agriculturalProcessId available for harvest history');
      this.dataSource.data = [];
    }
  }

  private loadFromRouteStateOrStorage(): void {
    const state = history.state;

    // 1️⃣ Preferimos state (HomeView → HarvestHistory)
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
      console.error('No agriculturalProcessId found in route state or localStorage (Harvest)');
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
            `Error fetching HARVEST activities for process ${this.agriculturalProcessId}`,
            err
          );
          this.dataSource.data = [];
        }
      });
  }
}
