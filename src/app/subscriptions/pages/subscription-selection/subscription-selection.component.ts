import {Component, inject} from '@angular/core';
import {SubscriptionDetailsComponent} from "../../components/subscription-details/subscription-details.component";
import {SubscriptionCardComponent} from "../../components/subscription-card/subscription-card.component";
import {Subscription} from "../../models/subscription.entity";
import {SubscriptionService} from "../../services/subscription.service";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-subscription-selection',
  standalone: true,
  imports: [
    SubscriptionDetailsComponent,
    SubscriptionCardComponent,
    MatIcon,
    MatFabButton,
    NgIf
  ],
  templateUrl: './subscription-selection.component.html',
  styleUrl: './subscription-selection.component.css'
})
export class SubscriptionSelectionComponent {
  subscriptionReceived: any
  id: any = 1;
  selectedSubscription: boolean = true;
  subscription!: Subscription;
  subscriptionService: SubscriptionService = inject(SubscriptionService);
  userId: number = 1;
  messageError: string = '';
  wasSelected: boolean = false;

  constructor() {
    this.subscription = new Subscription({});
  }

  handleSelection() {
    this.selectedSubscription = true;
    this.wasSelected = true;
    this.messageError = '';
  }

  handleSubscription(event:any) {
    this.subscriptionReceived = event;
  }

  handleId(event:any) {
    this.id = event;
  }

  onSubmit() {
    if (this.wasSelected) {
      const subscriptionToCreate = {
        planType: this.subscriptionReceived.type,
        userId: this.userId,
        status: 'active',
        cost: this.subscriptionReceived.price
      }
      console.log('Subscription to create: ', subscriptionToCreate);
      this.subscriptionService.create(subscriptionToCreate).subscribe((response) => {
          console.log('Subscription created: ', response);
        }
      );
    } else {
      this.messageError = 'Please select a subscription';
    }
  }
}
