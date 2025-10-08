import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";
import {NgIf} from "@angular/common";
import {NgClass} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-last-activity-card',
  standalone: true,
  imports: [MatCardModule, NgIf, MatIcon, TranslateModule, NgClass],
  templateUrl: './last-activity-card.component.html',
  styleUrl: './last-activity-card.component.css'
})
export class LastActivityCardComponent implements OnInit {
  @Input() type!: string;
  @Input() agriculturalProcessId!: number;
  private agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);
  agriculturalActivity!: AgriculturalActivity;
  item = {
    agriculturalProcessId: 0,
    action: '',
  };

  getAgriculturalActivity() {
    return this.agriculturalProcessService.getLastActivityByType(this.type, this.agriculturalProcessId)
      .subscribe(activity => this.agriculturalActivity = activity);
  }

  ngOnInit(): void {
    this.getAgriculturalActivity();
  }

  executeActivity(id: number, agriculturalProcessId: number, action: string) {
    this.item.agriculturalProcessId = agriculturalProcessId;
    this.item.action = action;
    this.agriculturalProcessService.executeActionOfAgriculturalActivity(id, this.item)
      .subscribe(() => this.getAgriculturalActivity());
  }
}
