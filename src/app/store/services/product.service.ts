import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Product} from "../models/product.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product>{

  constructor() {
    super();
    this.resourceEndpoint = '/products';
  }

  getAllByUserId(userId: number) {
    this.setToken();
    return this.http.get<Array<Product>>(`${this.resourcePath()}/user/${userId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllButNotByUserId(userId: number) {
    this.setToken();
    return this.http.get<Array<Product>>(`${this.resourcePath()}/${userId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateQuantity(id: number, data: { action: string, quantity: number }): Observable<Product> {
    this.setToken();
    return this.http.put<Product>(`${this.resourcePath()}/${id}/update-quantity`, data, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }
}
