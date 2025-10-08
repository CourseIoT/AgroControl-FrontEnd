import {Component, Input} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CurrencyPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    NgIf,
    CurrencyPipe,
    TitleCasePipe,
    NgClass,
    TranslateModule
  ],
  templateUrl: './sales-table.component.html',
  styleUrl: './sales-table.component.css'
})
export class SalesTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['date', 'product', 'quantity', 'total', 'buyer'];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTotalIncome() {
    return this.dataSource.data.map((t: any) => t.totalCostProduct).reduce((acc: any, value: any) => acc + value, 0);
  }
}
