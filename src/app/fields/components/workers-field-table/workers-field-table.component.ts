import { Component, Input } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import { Worker } from "../../models/worker.entity";

@Component({
  selector: 'app-workers-field-table',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    TranslateModule
  ],
  templateUrl: './workers-field-table.component.html',
  styleUrl: './workers-field-table.component.css'
})
export class WorkersFieldTableComponent {
  @Input() workers: Worker[] = [];
}
