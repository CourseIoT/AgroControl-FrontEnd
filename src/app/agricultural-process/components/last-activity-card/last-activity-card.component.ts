import {
  Component,
  inject,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AgriculturalProcessService } from "../../services/agricultural-process.service";
import { AgriculturalActivity } from "../../models/agricultural-activity.entity";
import { NgIf, NgClass } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-last-activity-card',
  standalone: true,
  imports: [MatCardModule, NgIf, MatIcon, TranslateModule, NgClass],
  templateUrl: './last-activity-card.component.html',
  styleUrl: './last-activity-card.component.css'
})
export class LastActivityCardComponent implements OnInit, OnChanges {
  @Input() type!: string;
  @Input() agriculturalProcessId!: number;
  @Input() treatmentType?: string;

  private agriculturalProcessService = inject(AgriculturalProcessService);

  agriculturalActivity: AgriculturalActivity | null = null;

  item = {
    agriculturalProcessId: 0,
    action: '',
  };

  ngOnInit(): void {
    this.loadActivity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] || changes['agriculturalProcessId'] || changes['treatmentType']) {
      this.loadActivity();
    }
  }

  private loadActivity(): void {
    if (!this.agriculturalProcessId || !this.type) return;

    // ⭐ Caso 1: CROP_TREATMENT con filtro por tipo (FERTILIZER / FUMIGATION)
    if (this.type === 'CROP_TREATMENT' && this.treatmentType) {
      this.agriculturalProcessService
        .getActivitiesByAgriculturalProcessId(this.agriculturalProcessId, this.type)
        .subscribe({
          next: activities => {
            const filtered = activities
              .filter(a => a.treatmentType === this.treatmentType)
              .sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
              );

            this.agriculturalActivity = filtered[0] ?? null;
          },
          error: err => {
            console.warn('No crop treatment activities found', err);
            this.agriculturalActivity = null;
          }
        });
      return;
    }

    // ⭐ Caso 2: SEEDING → hay procesos sin SEEDING aún → mejor traer lista
    if (this.type === 'SEEDING') {
      this.agriculturalProcessService
        .getActivitiesByAgriculturalProcessId(this.agriculturalProcessId, this.type)
        .subscribe({
          next: activities => {
            const sorted = activities
              .sort((a, b) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
              );
            this.agriculturalActivity = sorted[0] ?? null;
          },
          error: err => {
            console.warn('No seeding activities found', err);
            this.agriculturalActivity = null;
          }
        });
      return;
    }

    // ⭐ Caso 3: IRRIGATION, HARVEST, etc. → endpoint lastActivity
    this.agriculturalProcessService
      .getLastActivityByType(this.type, this.agriculturalProcessId)
      .subscribe({
        next: activity => this.agriculturalActivity = activity,
        error: err => {
          console.warn('No last activity found', err);
          this.agriculturalActivity = null;
        }
      });
  }

  executeActivity(id: number, agriculturalProcessId: number, action: string) {
    this.item.agriculturalProcessId = agriculturalProcessId;
    this.item.action = action;
    this.agriculturalProcessService.executeActionOfAgriculturalActivity(id, this.item)
      .subscribe({
        next: () => this.loadActivity(),
        error: err => console.error('Error executing activity', err)
      });
  }
}
