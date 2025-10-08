export class Distributor {
  fullName: string;
  city: string;
  country: string;
  phone: string;
  companyName: string;
  ruc: string;

  constructor(distributor: {
    fullName?: string,
    city?: string,
    country?: string,
    phone?: string,
    companyName?: string,
    ruc?: string
  }) {
    this.fullName = distributor.fullName || '';
    this.city = distributor.city || '';
    this.country = distributor.country || '';
    this.phone = distributor.phone || '';
    this.companyName = distributor.companyName || '';
    this.ruc = distributor.ruc || '';
  }
}
