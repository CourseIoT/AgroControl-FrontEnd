export class Worker {
  id: number;
  producerId: number;
  fullName: string;
  documentNumber: string;

  constructor(worker: { id?: number, producerId?: number, fullName?: string, documentNumber?: string }) {
    this.id = worker.id || 0;
    this.producerId = worker.producerId || 0;
    this.fullName = worker.fullName || '';
    this.documentNumber = worker.documentNumber || '';
  }
}
