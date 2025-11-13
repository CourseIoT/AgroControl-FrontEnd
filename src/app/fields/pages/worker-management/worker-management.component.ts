import { Component, inject, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { TranslateModule } from "@ngx-translate/core";

import { WorkerFieldFormComponent } from "../../components/worker-field-form/worker-field-form.component";
import { WorkersFieldTableComponent } from "../../components/workers-field-table/workers-field-table.component";
import { Worker } from "../../models/worker.entity";
import { WorkerService } from "../../services/worker.service";

@Component({
  selector: 'app-worker-management',
  standalone: true,
  imports: [
    MatButton,
    WorkerFieldFormComponent,
    WorkersFieldTableComponent,
    TranslateModule
  ],
  templateUrl: './worker-management.component.html',
  styleUrl: './worker-management.component.css'
})
export class WorkerManagementComponent implements OnInit {
  modalOpen = false;
  dataSource: Array<Worker> = [];
  userId!: number;

  private workerService: WorkerService = inject(WorkerService);

  constructor(private router: Router) {}

  ngOnInit() {
    this.getWorkers();
  }

  getWorkers() {
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (!this.userId) {
      console.error('No userId found in localStorage');
      return;
    }

    this.workerService.getAllByUserId(this.userId)
      .subscribe((response: Array<Worker>) => this.dataSource = response);
  }

  handleSuccess() {
    this.getWorkers();
    this.closeModal();
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  goToHome() {
    const agriculturalProcessId = localStorage.getItem('agriculturalProcessId') || 0;
    this.router.navigate(['home-agricultural-process', agriculturalProcessId]);
  }
}
