import {Component, Input} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from "@angular/common";
import {ResourcesTableComponent} from "../resources-table/resources-table.component";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-agricultural-activity-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, NgIf, ResourcesTableComponent, MatIcon, MatIconButton, TranslateModule],
  templateUrl: './agricultural-activity-table.component.html',
  styleUrl: './agricultural-activity-table.component.css'
})
export class AgriculturalActivityTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: string[];
  showTable: boolean = false;
  selectedResources: any;

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  showPopup(resource: any) {
    this.selectedResources = resource; // Guarda el recurso seleccionado
    this.showTable = true; // Abre el popup
  }

  handleClosed(event: any) {
    this.showTable = false; // Cierra el popup
    this.selectedResources = null; // Limpia el recurso seleccionado
  }
}
