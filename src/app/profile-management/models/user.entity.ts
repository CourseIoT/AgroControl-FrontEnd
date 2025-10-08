export class User {
  id: number;
  email: string;
  password: string;
  confirmPassword: string;
  roles: string[];
  fullName: string;
  city: string;
  country: string;
  phone: string;
  dni: string;
  companyName: string;
  ruc: string;
  token: string;

  constructor(user: {
    id?: number,
    email?: string,
    password?: string,
    confirmPassword?: string,
    roles?: string[],
    fullName?: string,
    city?: string,
    country?: string,
    phone?: string,
    dni?: string,
    companyName?: string,
    ruc?: string,
    token?: string
  }) {
    this.id = user.id || 0;
    this.email = user.email || '';
    this.password = user.password || '';
    this.confirmPassword = user.confirmPassword || '';
    this.roles = user.roles || [];
    this.fullName = user.fullName || '';
    this.city = user.city || '';
    this.country = user.country || '';
    this.phone = user.phone || '';
    this.dni = user.dni || '';
    this.companyName = user.companyName || '';
    this.ruc = user.ruc || '';
    this.token = user.token || '';
  }
}
