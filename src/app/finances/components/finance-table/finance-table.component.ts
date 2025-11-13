import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {CurrencyPipe, NgClass, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-finance-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NgIf,
    CurrencyPipe,
    NgClass,
    TranslateModule
  ],
  templateUrl: './finance-table.component.html',
  styleUrl: './finance-table.component.css'
})
export class FinanceTableComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'date', 'type', 'description', 'value', 'actions'];
  filterType: string = 'ALL';
  private originalData: any[] = [];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByType(type: string): void {
    this.filterType = type;

    // 👉 Si aún no hemos guardado la data original, la guardamos ahora
    if (!this.originalData.length && this.dataSource.data.length) {
      this.originalData = [...this.dataSource.data];
    }

    if (type === 'ALL') {
      this.dataSource.data = [...this.originalData];
    } else {
      this.dataSource.data = this.originalData.filter(
        (item: any) => item.type === type
      );
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalIncome(): number {
    return this.dataSource.data
      .filter((item: any) => item.type === 'INCOME')
      .reduce((acc: number, item: any) => acc + item.value, 0);
  }

  getTotalExpense(): number {
    return this.dataSource.data
      .filter((item: any) => item.type === 'EXPENSE')
      .reduce((acc: number, item: any) => acc + item.value, 0);
  }

  getNetBalance(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }
}
