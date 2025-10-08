import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {AgriculturalProcess} from "../models/agricultural-process.entity";
import {AgriculturalActivity} from "../models/agricultural-activity.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AgriculturalProcessService extends BaseService<AgriculturalProcess>{

  constructor() {
    super();
    this.resourceEndpoint = '/agricultural-processes';
  }

  getLastActivityByType(activityType: String, agriculturalProcessId : number) {
    this.setToken();
    return this.http.get<AgriculturalActivity>(`${this.resourcePath()}/${agriculturalProcessId}/lastActivity/${activityType}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  getActivitiesByAgriculturalProcessId(agriculturalProcessId: number, activityType: String) {
    this.setToken();
    return this.http.get<Array<AgriculturalActivity>>(`${this.resourcePath()}/${agriculturalProcessId}/activities/${activityType}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUnfinishedAgriculturalProcessByFieldId(fieldId: number) {
    this.setToken();
    return this.http.get<AgriculturalProcess>(`${this.resourcePath()}/field/${fieldId}/unfinished`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  finishAgriculturalProcess(agriculturalProcessId: number) {
    this.setToken();
    return this.http.put<AgriculturalProcess>(`${this.resourcePath()}/finish/${agriculturalProcessId}`, {}, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }


  executeActionOfAgriculturalActivity(activityId: number, content: any) {
    this.setToken();
    return this.http.put<AgriculturalActivity>(`${this.resourcePath()}/activity/${activityId}/execute`, content, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  addActivity(
    agriculturalProcessId: number,
    date: string,
    hoursIrrigated: number,
    plantType: string ,
    quantityPlanted: number,
    treatmentType: string,
    quantityInKg: number,
    pricePerKg: number
  ) {
    this.setToken();

    // Create the query string
    // @ts-ignore
    const params = new URLSearchParams({
      agriculturalProcessId: agriculturalProcessId,
      date: date,
      hoursIrrigated: hoursIrrigated,
      plantType: plantType,
      quantityPlanted: quantityPlanted,
      treatmentType: treatmentType,
      quantityInKg: quantityInKg,
      pricePerKg: pricePerKg
    });
    // Ask the backend to add the activity
    return this.http.post<AgriculturalActivity>(
      `${this.resourcePath()}/add-activity?${params}`,
      {}, // Empty body because we are sending the data in the query string
      this.httpOptionsAuthorized
    ).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  addResourceToActivity(resource: any) {
    this.setToken();
    return this.http.post<AgriculturalActivity>(`${this.resourcePath()}/activity/add-resource`, resource, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

}
