  import {Component, Input} from '@angular/core';
  import {MatTableDataSource, MatTableModule} from '@angular/material/table';
  import {MatInputModule} from '@angular/material/input';
  import {MatFormFieldModule} from '@angular/material/form-field';
  import {CurrencyPipe, NgClass, NgIf, TitleCasePipe} from "@angular/common";
  import {TranslateModule} from "@ngx-translate/core";
  import {MatIcon} from "@angular/material/icon";

  @Component({
    selector: 'app-sales-table',
    standalone: true,
    imports: [
      MatTableModule,
      MatInputModule,
      MatFormFieldModule,
      NgIf,
      CurrencyPipe,
      TranslateModule,
      MatIcon
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

    getTotalIncome(): number {
      return this.dataSource.data.map((t: any) => t.totalCostProduct).reduce((acc: any, value: any) => acc + value, 0);
    }

    getTotalProductsSold(): number {
      return this.dataSource.data.map((t: any) => t.quantityProduct).reduce((acc: any, value: any) => acc + value, 0);
    }
  }
