import {Component, inject} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";
import {
  AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-harvest-history',
  standalone: true,
  imports: [
    AgriculturalActivityTableComponent,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './harvest-history.component.html',
  styleUrl: './harvest-history.component.css'
})
export class HarvestHistoryComponent {
  protected dataSource!: MatTableDataSource<any>;
  protected displayedColumns: string[] = ['id', 'date', 'workersTotalCost',  'pricePerKg', 'quantityInKg', 'totalIncome', 'resources'];
  private activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  private agriculturalProcessId!: number;
  private activityType: String = 'HARVEST';

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
