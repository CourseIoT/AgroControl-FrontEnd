import {Component, Input} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {Worker} from "../../models/worker.entity";
import {NgFor, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {WorkerFieldFormComponent} from "../worker-field-form/worker-field-form.component";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-workers-field-table',
  standalone: true,
  imports: [MatTableModule, NgFor, NgIf, MatButton, WorkerFieldFormComponent, RouterLink, TranslateModule],
  templateUrl: './workers-field-table.component.html',
  styleUrl: './workers-field-table.component.css'
})
export class WorkersFieldTableComponent {
  displayedColumns: string[] = ['id', 'fullName', 'phone', 'documentNumber'];
  @Input() workers!: Array<Worker>;
  @Input() userId!: number;
  modalOpen: boolean = false;
  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleSuccess() {
    this.closeModal();
  }
}
