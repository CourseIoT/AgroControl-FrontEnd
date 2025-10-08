import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductStored} from "../models/product-stored.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductStoredService extends BaseService<ProductStored>{

  constructor() {
    super();
    this.resourceEndpoint = "/payment-products";
  }

  getAllByOwnerId(ownerId: number) {
    this.setToken();
    return this.http.get<Array<ProductStored>>(`${this.resourcePath()}/owner-product/${ownerId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }
}
