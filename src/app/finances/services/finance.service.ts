import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Finance} from "../models/finance.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinanceService extends BaseService<Finance>{

  constructor() {
    super();
    this.resourceEndpoint = '/finances';
  }

  getFinancesByAgriculturalProcessId(agriculturalProcessId: number) {
    this.setToken();
    return this.http.get<Array<Finance>>(`${this.resourcePath()}/${agriculturalProcessId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }
}
