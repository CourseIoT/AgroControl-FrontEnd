import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {inject} from "@angular/core";
import {environment} from "../../../environments/environment";
import {catchError, Observable, retry, throwError} from "rxjs";
import {TokenService} from "./token.service";

export class BaseService<T> {

  protected httOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  protected http: HttpClient = inject(HttpClient);

  protected tokenService : TokenService = inject(TokenService);

  protected token: string | null = null;

  protected httpOptionsAuthorized = this.createHttpOptions();

  protected basePath: string = `${environment.serverBasePath}`;

  protected resourceEndpoint: string = '/resources';

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  protected resourcePath() {
    return `${this.basePath}${this.resourceEndpoint}`;
  }

  private createHttpOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token ? `Bearer ${this.token}` : ''
      })
    };
  }
  // Metodo público que establece un nuevo token manualmente y actualiza las cabeceras
  public newToken(token: string): void {
    this.tokenService.setToken(token);
    this.token = token;
    this.httpOptionsAuthorized = this.createHttpOptions();
  }

  // Metodo público que carga el token desde TokenService cuando lo necesites
  public setToken(): void {
    const storedToken = this.tokenService.getToken();
    if (storedToken) {
      this.token = storedToken;
      this.httpOptionsAuthorized = this.createHttpOptions();
    }
  }

  public create(item: any): Observable<T> {
    this.setToken();
    return this.http.post<T>(this.resourcePath(), JSON.stringify(item), this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  public delete(id: any): Observable<any> {
    this.setToken();
    return this.http.delete(`${this.resourcePath()}/${id}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  public update(id: any, item: any): Observable<T> {
    this.setToken();
    return this.http.put<T>(`${this.resourcePath()}/${id}`, JSON.stringify(item), this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getAll(): Observable<T[]> {
    this.setToken();
    return this.http.get<T[]>(this.resourcePath(), this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  public getById(id: any): Observable<T> {
    this.setToken();
    return this.http.get<T>(`${this.resourcePath()}/${id}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }
}
