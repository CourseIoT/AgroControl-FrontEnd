export class Subscription {
  id: number;
  plantType: string;
  userId: number;
  startDate: string;
  renewalDate: string;
  status: string;
  cost: number;

  constructor(subscription: {
    id?: number,
    plantType?: string,
    userId?: number,
    startDate?: string,
    renewalDate?: string,
    status?: string,
    cost?: number}) {
    this.id = subscription.id || 0;
    this.plantType = subscription.plantType || '';
    this.userId = subscription.userId || 0;
    this.startDate = subscription.startDate || '';
    this.renewalDate = subscription.renewalDate || '';
    this.status = subscription.status || '';
    this.cost = subscription.cost || 0;
  }
}
