import {Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProductStoredService} from "../../services/product-stored.service";
import {SalesTableComponent} from "../../components/sales-table/sales-table.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-sales-history',
  standalone: true,
  imports: [
    SalesTableComponent,
    TranslateModule
  ],
  templateUrl: './sales-history.component.html',
  styleUrl: './sales-history.component.css'
})
export class SalesHistoryComponent implements OnInit{
  protected dataSource!: MatTableDataSource<any>;
  private productStoreService: ProductStoredService = inject(ProductStoredService);
  private userId!: number;

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getSalesHistory();
  }

  getSalesHistory(): void {
    this.userId = parseInt(localStorage.getItem('userId') || '');
    this.productStoreService.getAllByOwnerId(this.userId)
      .subscribe((data: any) => {
        this.dataSource.data = data;
      });
  }
}
