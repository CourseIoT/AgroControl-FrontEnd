import {computed, Injectable, signal} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {User} from "../models/user.entity";
import {catchError, Observable, of, retry, tap} from "rxjs";
import {AuthStatus} from "../models/auth-status.enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User>{
  private _authStatus = signal<AuthStatus>( AuthStatus.checking );
  //! Al mundo exterior
  public authStatus = computed( () => this._authStatus() );
  constructor() {
    super();
    this.resourceEndpoint = '/authentication';
    this.checkAuthStatus().subscribe();
  }

  createAgriculturalProducer(user : User){
    return this.http.post<User>(`${this.resourcePath()}/sign-up/agricultural-producer`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  createDistributor(user : User){
    return this.http.post(`${this.resourcePath()}/sign-up/distributor`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Método para iniciar sesión y almacenar token, roles y userId
  LogInUser(user: User): Observable<User> {
    return this.http.post<any>(`${this.resourcePath()}/sign-in`, user).pipe(
      retry(2),
      catchError(this.handleError),
      tap((response) => {
        // Guardamos el token, roles y userId en el localStorage
        this.newToken(response.token); // Guarda el token en el BaseService y actualiza las cabeceras
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id.toString());
        localStorage.setItem('roles', JSON.stringify(response.roles));
        this._authStatus.set(AuthStatus.authenticated);
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    console.log('Token encontrado en localStorage:', token);
    if (token) {
      this._authStatus.set(AuthStatus.authenticated);  // Establece estado como autenticado
      return of(true);  // Retorna Observable con 'true'
    } else {
      this._authStatus.set(AuthStatus.notAuthenticated);  // Establece estado como no autenticado
      return of(false);  // Retorna Observable con 'false'
    }
  }

  logOut(){
    localStorage.clear();
    this._authStatus.set( AuthStatus.notAuthenticated );
  }
}
