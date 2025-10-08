import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Profile} from "../models/profile.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends BaseService<Profile>{

  constructor() {
    super();
    this.resourceEndpoint = '/profiles';
  }

  getDistributorByUserId(userId: number) {
    this.setToken();
    return this.http.get<Profile>(`${this.resourcePath()}/distributor/${userId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  getProducerByUserId(userId: number) {
    this.setToken();
    return this.http.get<Profile>(`${this.resourcePath()}/agricultural-producer/${userId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }
}
