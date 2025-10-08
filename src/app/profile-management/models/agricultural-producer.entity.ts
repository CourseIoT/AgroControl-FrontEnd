export class AgriculturalProducer {
  fullName: string;
  city: string;
  country: string;
  phone: string;
  dni: string;

  constructor(agriculturalProducer: {
    fullName?: string,
    city?: string,
    country?: string,
    phone?: string,
    dni?: string
  }) {
    this.fullName = agriculturalProducer.fullName || '';
    this.city = agriculturalProducer.city || '';
    this.country = agriculturalProducer.country || '';
    this.phone = agriculturalProducer.phone || '';
    this.dni = agriculturalProducer.dni || '';
  }
}
