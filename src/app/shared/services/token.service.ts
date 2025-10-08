import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'token';

  constructor() { }

  // Guardar token en localStorage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Recuperar token de localStorage
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Eliminar el token de localStorage
  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
