import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Subscription} from "../models/subscription.entity";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService extends BaseService<Subscription>{

  constructor() {
    super();
    this.resourceEndpoint = '/subscriptions';
  }
}
