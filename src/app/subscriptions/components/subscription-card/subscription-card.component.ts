import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-subscription-card',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.css'
})
export class SubscriptionCardComponent implements OnInit {
  @Input() subscriptionType!: number;
  @Output() subscriptionId = new EventEmitter<number>();
  subscription!: { type: string, price: number };
  @Input() isSelected!: boolean;
  @Output() subscriptionSelected = new EventEmitter<{ type: string, price: number }>();

  toggleSelect(): void {
    this.isSelected = !this.isSelected;
    this.subscriptionSelected.emit(this.subscription);
    this.subscriptionId.emit(this.subscriptionType);
  }

  ngOnInit(): void {
    this.getSubscription();
  }

  private getSubscription(): void {
    switch (this.subscriptionType) {
      case 1:
        this.subscription = { type: 'BASIC', price: 19.99 };
        break;
      case 2:
        this.subscription = { type: 'PREMIUM', price: 89.99 };
        break;
      default:
        this.subscription = { type: 'STANDARD', price: 89.99 };
        break;
    }
  }
}
