import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {FinanceService} from "../../services/finance.service";
import {Finance} from "../../models/finance.entity";
import {FinanceTableComponent} from "../../components/finance-table/finance-table.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-finance-view',
  standalone: true,
  imports: [
    FinanceTableComponent,
    TranslateModule
  ],
  templateUrl: './finance-view.component.html',
  styleUrl: './finance-view.component.css'
})
export class FinanceViewComponent implements OnInit{
  protected dataSource!: MatTableDataSource<any>;
  private financeService: FinanceService = inject(FinanceService);
  private agriculturalProcessId!: number;

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getFinances();
  }

  getFinances(): void {
    this.agriculturalProcessId = parseInt(localStorage.getItem('agriculturalProcessId') || '');
    this.financeService.getFinancesByAgriculturalProcessId(this.agriculturalProcessId)
      .subscribe((data: Array<Finance>) => {
        this.dataSource.data = data;
      });
  }
}
