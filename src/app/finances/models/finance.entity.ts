export class Finance {
  id: number;
  agriculturalProcessId: number;
  date: String;
  type: String;
  description: String;
  value: number;

  constructor(finance: {
    id?: number, agriculturalProcessId?: number,
    date?: String, type?: String,
    description?: String, value?: number}) {
    this.id = finance.id || 0;
    this.agriculturalProcessId = finance.agriculturalProcessId || 0;
    this.date = finance.date || '';
    this.type = finance.type || '';
    this.description = finance.description || '';
    this.value = finance.value || 0;
  }
}
