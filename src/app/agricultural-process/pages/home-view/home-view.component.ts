import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LastActivityCardComponent } from "../../components/last-activity-card/last-activity-card.component";
import { WorkerService } from "../../../fields/services/worker.service";
import { Worker } from "../../../fields/models/worker.entity";
import { WorkersFieldTableComponent } from "../../../fields/components/workers-field-table/workers-field-table.component";
import { MatButton } from "@angular/material/button";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { AgriculturalProcessService } from "../../services/agricultural-process.service";

@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    LastActivityCardComponent,
    WorkersFieldTableComponent,
    MatButton,
    NgIf,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent implements OnInit {

  fieldName: string = '';
  fieldId!: number;
  userId!: number;
  agriculturalProcessId!: number;
  workers: Array<Worker> = [];

  workerService: WorkerService = inject(WorkerService);
  agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadFieldInfo();
    this.loadUser();
    this.getWorkersByUserId();

    // 👇 aquí escuchamos SIEMPRE los cambios de /home-agricultural-process/:id
    this.route.paramMap.subscribe(params => {
      const routeId = Number(params.get('id'));
      const state = history.state || {};

      if (!isNaN(routeId) && routeId > 0) {
        // 1) Si hay :id en la URL, ese manda
        this.setCurrentProcess(routeId);
      } else if (state.agriculturalProcessId) {
        // 2) Si venimos por state (p.ej. desde FieldCard)
        this.setCurrentProcess(Number(state.agriculturalProcessId));
      } else {
        // 3) Fallback a localStorage
        const storedId = localStorage.getItem('agriculturalProcessId');
        if (storedId) {
          this.setCurrentProcess(Number(storedId));
        } else {
          console.warn('No agriculturalProcessId found; redirecting to /fields');
          this.router.navigate(['/fields']);
        }
      }
    });
  }

  /** Carga solo info del field (no del proceso) */
  private loadFieldInfo() {
    const state = history.state || {};

    if (state.fieldId) {
      this.fieldId = state.fieldId;
      this.fieldName = state.fieldName || '';

      localStorage.setItem('fieldId', String(this.fieldId));
      localStorage.setItem('fieldName', this.fieldName);
    } else {
      const storedFieldId = localStorage.getItem('fieldId');
      const storedFieldName = localStorage.getItem('fieldName');

      if (storedFieldId) this.fieldId = Number(storedFieldId);
      if (storedFieldName) this.fieldName = storedFieldName;
    }
  }

  private loadUser() {
    this.userId = JSON.parse(localStorage.getItem('userId') || '0');
  }

  private setCurrentProcess(id: number) {
    this.agriculturalProcessId = id;
    localStorage.setItem('agriculturalProcessId', String(id));
    console.log('Current agriculturalProcessId =>', id);
  }

  getWorkersByUserId() {
    if (!this.userId) return;

    this.workerService.getAllByUserId(this.userId).subscribe((workers) => {
      this.workers = workers.slice(0, 2) as Worker[];
      console.log(this.workers);
    });
  }

  /** Crear nuevo proceso para ESTE field */
  startNewProcess() {
    if (!this.fieldId) {
      console.error('No fieldId available to start a new process');
      return;
    }

    const item = { fieldId: this.fieldId };

    this.agriculturalProcessService.create(item).subscribe({
      next: (response) => {
        console.log('New process created:', response);

        this.setCurrentProcess(response.id);

        this.router.navigate(['/activity-scheduler', 'Seeding'], {
          state: {
            fieldId: this.fieldId,
            fieldName: this.fieldName,
            agriculturalProcessId: response.id
          }
        });
      },
      error: (err) => console.error('Error creating new process:', err)
    });
  }

  finishProcess() {
    if (!this.agriculturalProcessId) {
      console.error('No agriculturalProcessId to finish');
      return;
    }

    this.agriculturalProcessService.finishAgriculturalProcess(this.agriculturalProcessId).subscribe(() => {
      console.log('Process finished');
    });
  }

  /** 🔢 Saltar manualmente a otro agriculturalProcessId */
  goToProcessById(idValue: string) {
    const targetId = Number(idValue);

    if (!targetId || isNaN(targetId) || targetId <= 0) {
      console.error('Invalid process id:', idValue);
      return;
    }

    // actualizamos URL; la suscripción a paramMap hará el resto
    this.router.navigate(['/home-agricultural-process', targetId], {
      state: {
        fieldId: this.fieldId,
        fieldName: this.fieldName,
        agriculturalProcessId: targetId
      }
    });
  }

  goToIrrigationHistory() {
    if (!this.agriculturalProcessId) {
      console.error('No agriculturalProcessId for irrigation history');
      return;
    }

    this.router.navigate(['/Irrigation-history'], {
      state: {
        fieldId: this.fieldId,
        fieldName: this.fieldName,
        agriculturalProcessId: this.agriculturalProcessId
      }
    });
  }

  goToCropTreatmentHistory() {
    if (!this.agriculturalProcessId) {
      console.error('No agriculturalProcessId for crop treatment history');
      return;
    }

    this.router.navigate(['/CropTreatment-history'], {
      state: {
        fieldId: this.fieldId,
        fieldName: this.fieldName,
        agriculturalProcessId: this.agriculturalProcessId
      }
    });
  }
}
