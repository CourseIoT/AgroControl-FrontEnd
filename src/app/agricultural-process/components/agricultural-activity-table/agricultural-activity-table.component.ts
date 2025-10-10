import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ResourcesTableComponent } from '../resources-table/resources-table.component';

@Component({
  selector: 'app-agricultural-activity-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    DecimalPipe,
    DatePipe,
    TranslateModule,
    ResourcesTableComponent
  ],
  templateUrl: './agricultural-activity-table.component.html',
  styleUrl: './agricultural-activity-table.component.css'
})
export class AgriculturalActivityTableComponent implements OnInit {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns: string[] = [];

  protected showTable: boolean = false;
  protected selectedResources!: MatTableDataSource<any>;

  ngOnInit(): void {
    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource<any>();
    }
    this.selectedResources = new MatTableDataSource<any>();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter(input: HTMLInputElement): void {
    input.value = '';
    this.dataSource.filter = '';
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showPopup(resources: any[]): void {
    if (resources && resources.length > 0) {
      this.selectedResources.data = resources;
      this.showTable = true;
    }
  }

  handleClosed(event: void): void {
    this.showTable = false;
    this.selectedResources.data = [];
  }

  getStatusClass(status: string): string {
    const statusLower = status?.toLowerCase().replace('_', '').replace('-', '') || '';

    const statusMap: { [key: string]: string } = {
      'completed': 'bg-green-100 text-green-800 border border-green-200',
      'completado': 'bg-green-100 text-green-800 border border-green-200',
      'pending': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'pendiente': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
      'inprogress': 'bg-blue-100 text-blue-800 border border-blue-200',
      'enprogreso': 'bg-blue-100 text-blue-800 border border-blue-200',
      'cancelled': 'bg-red-100 text-red-800 border border-red-200',
      'cancelado': 'bg-red-100 text-red-800 border border-red-200',
      'notstarted': 'bg-gray-100 text-gray-800 border border-gray-200',
      'noiniciado': 'bg-gray-100 text-gray-800 border border-gray-200'
    };

    return statusMap[statusLower] || 'bg-gray-100 text-gray-800 border border-gray-200';
  }

  getStatusText(status: string): string {
    const statusLower = status?.toLowerCase().replace('_', '').replace('-', '') || '';

    const statusTextMap: { [key: string]: string } = {
      'notstarted': 'shared.notStarted',
      'noiniciado': 'shared.notStarted',
      'pending': 'shared.pending',
      'pendiente': 'shared.pending',
      'inprogress': 'shared.inProgress',
      'enprogreso': 'shared.inProgress',
      'completed': 'shared.completed',
      'completado': 'shared.completed',
      'cancelled': 'shared.cancelled',
      'cancelado': 'shared.cancelled'
    };

    return statusTextMap[statusLower] || status;
  }
}
