import {Component, Input} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CurrencyPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
@Component({
  selector: 'app-finance-table',
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
  templateUrl: './finance-table.component.html',
  styleUrl: './finance-table.component.css'
})
export class FinanceTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'date', 'type', 'description', 'value'];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
