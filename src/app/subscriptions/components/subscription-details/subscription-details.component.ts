import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-subscription-details',
  standalone: true,
  imports: [NgIf, MatIcon, NgForOf],
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css'],
})
export class SubscriptionDetailsComponent implements OnInit, OnChanges {
  @Input() subscriptionType!: number;
  details: Array<string> = [];

  ngOnInit(): void {
    this.getDetails();
    console.log('Initial subscriptionType:', this.subscriptionType);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['subscriptionType']) {
      this.getDetails(); // Update details if subscriptionType changes
      console.log('Updated subscriptionType:', this.subscriptionType);
    }
  }

  private getDetails(): void {
    switch (this.subscriptionType) {
      case 1:
        this.details = [
          'Fields: Management of 1 field',
          'Planting: Basic tracking of plant quantities and labor',
          'Irrigation: Basic Scheduling Calendar',
          'Fumigation: Simple planning for fumigation',
          'Harvest: Production tracking',
          'Distribution: Basic sale management',
          'Support: Standard support',
        ];
        break;
      case 2:
        this.details = [
          'Fields: Management of up to 5 fields',
          'Planting: Advanced tracking of plant quantities and labor',
          'Irrigation: Advanced Scheduling Calendar',
          'Fumigation: Advanced planning for fumigation',
          'Harvest: Production tracking with quality control',
          'Distribution: Advanced sale management',
          'Support: Priority support',
        ];
        break;
      default:
        this.details = [
          'Stock Management: Real-time stock management',
          'Delivery scheduling: Advanced delivery scheduling',
          'Sales Analysis: Advanced sales analysis',
          'Support: Premium support',
        ];
        break;
    }
  }

  trackByDetail(index: number, detail: string): string {
    return detail; // Using the detail string itself as the unique identifier
  }
}
