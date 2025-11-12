// fields.service.ts
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Fields } from '../models/fields.entity';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FieldsService extends BaseService<Fields> {
  constructor() {
    super();
    this.resourceEndpoint = '/fields';
  }

  getFieldsByUserId(userId: number): Observable<Fields[]> {
    this.setToken();
    return this.http.get<Fields[]>(
      `${this.resourcePath()}/user/${userId}`,
      this.httpOptionsAuthorized
    );
  }

  override getById(id: number): Observable<Fields> {
    this.setToken();
    return this.http.get<Fields>(
      `${this.resourcePath()}/${id}`,
      this.httpOptionsAuthorized
    );
  }

  /** POST /api/v1/fields */
  override create(field: Fields): Observable<Fields> {
    this.setToken();
    return this.http.post<Fields>(
      `${this.resourcePath()}`,
      field, // { producerId, fieldName, location, size }
      this.httpOptionsAuthorized
    );
  }

  /**
   * PUT /api/v1/fields/{id}/update-field
   */
  override update(id: number, field: Fields): Observable<Fields> {
    this.setToken();
    const body = {
      name: field.fieldName,
      location: field.location,
      size: field.size,
      producerId: field.producerId,
    };
    return this.http.put<Fields>(
      `${this.resourcePath()}/${id}/update-field`,
      body,
      this.httpOptionsAuthorized
    );
  }

  /**
   * DELETE /api/v1/fields/{id}?producerId=...
   */
  override delete(id: number, producerId?: number): Observable<any> {
    this.setToken();
    return this.http.delete(
      `${this.resourcePath()}/${id}`,
      { ...this.httpOptionsAuthorized, params: { producerId } as any }
    );
  }
}
