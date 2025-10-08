export class Profile {
  userId: number;
  profileId: number;
  fullName: string;
  city: string;
  country: string;
  phone: string;
  companyName: string;
  ruc: string;
  dni: string;

  constructor(profile: {
    userId?: number,
    profileId?: number,
    fullName?: string,
    city?: string,
    country?: string,
    phone?: string,
    companyName?: string,
    ruc?: string,
    dni?: string
  }) {
    this.userId = profile.userId || 0;
    this.profileId = profile.profileId || 0;
    this.fullName = profile.fullName || '';
    this.city = profile.city || '';
    this.country = profile.country || '';
    this.phone = profile.phone || '';
    this.companyName = profile.companyName || '';
    this.ruc = profile.ruc || '';
    this.dni = profile.dni || '';
  }

}
