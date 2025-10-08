import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-resources-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, NgIf, MatIcon, TranslateModule],

  templateUrl: './resources-table.component.html',
  styleUrl: './resources-table.component.css'
})
export class ResourcesTableComponent {
  @Input() showTable!: boolean;
  @Output() close = new EventEmitter<void>();
  @Input() dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'cost', 'quantity'];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  closePopup() {
    this.close.emit();
  }
}
