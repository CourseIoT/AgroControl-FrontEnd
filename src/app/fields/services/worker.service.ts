import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Worker} from "../models/worker.entity";
import {catchError, retry} from "rxjs";

@Injectable({providedIn: 'root'})
export class WorkerService extends BaseService<Worker>{

  constructor() {
    super();
    this.resourceEndpoint = '/workers';
  }

  getAllByUserId(producerId: number) {
    this.setToken();
    return this.http.get<Array<Worker>>(`${this.resourcePath()}/${producerId}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }
}
