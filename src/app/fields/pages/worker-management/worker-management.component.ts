import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {WorkerFieldFormComponent} from "../../components/worker-field-form/worker-field-form.component";
import {WorkersFieldTableComponent} from "../../components/workers-field-table/workers-field-table.component";
import {Worker} from "../../models/worker.entity";
import {WorkerService} from "../../services/worker.service";
import {Router} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

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
export class WorkerManagementComponent implements OnInit{
  modalOpen: boolean = false;
  protected dataSource!: Array<Worker>;
  private workerService: WorkerService = inject(WorkerService);
  userId!: number;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.getWorkers();
  }

  getWorkers() {
    this.userId = parseInt(localStorage.getItem('userId') || '');
    this.workerService.getAllByUserId(this.userId).subscribe((response: Array<Worker>) => this.dataSource = response);
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
    const agriculturalProcessId = localStorage.getItem('agriculturalProcessId');
    this.router.navigate(['home-agricultural-process', agriculturalProcessId]);
  }
}
