import {Component, inject, OnInit} from '@angular/core';
import {
  AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";
import {MatTableDataSource} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from "@angular/router";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-irrigation-history',
  standalone: true,
  imports: [
    AgriculturalActivityTableComponent,
    MatButtonModule,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './irrigation-history.component.html',
  styleUrl: './irrigation-history.component.css'
})
export class IrrigationHistoryComponent implements OnInit {
  protected dataSource!: MatTableDataSource<any>;
  protected displayedColumns: string[] = ['id', 'date', 'workersTotalCost',  'activityStatus', 'hoursIrrigated', 'resources'];
  private activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  private agriculturalProcessId!: number;
  private activityType: String = 'IRRIGATION';

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities(): void {
    this.agriculturalProcessId = parseInt(localStorage.getItem('agriculturalProcessId') || '');
    this.activityService.getActivitiesByAgriculturalProcessId(this.agriculturalProcessId, this.activityType)
      .subscribe((data: Array<AgriculturalActivity>) => {
        this.dataSource.data = data;
      });
  }
}
