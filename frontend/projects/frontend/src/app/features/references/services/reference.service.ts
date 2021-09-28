import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllOptions } from '../../../core/model/get-all-options';
import { GetAllResponse } from '../../../core/model/get-all-response';
import { Reference } from '../model/reference';
import { ReferenceAdapter } from './reference-adapter.service';

/**
 * Service responsable d'opérations CRUD basiques sur les références commerciales
 * à travers l'API REST du back-end.
 */
@Injectable({
  providedIn: 'root',
})
export class ReferenceService {
  private baseUrl = `${environment.apiUrl}/references`;

  constructor(
    private http: HttpClient,
    private referenceAdapter: ReferenceAdapter
  ) {}

  getAll(
    options?: GetAllOptions<Reference>
  ): Observable<GetAllResponse<Reference>> {
    const params = new HttpParams({
      fromObject: {
        ...(options?.filter && { filter: options.filter }),
        sort: (options?._sort || 'name') + ',' + (options?._order || 'asc'),
        page: String((options?._page || 1) - 1),
        size: String(options?._limit || 10),
      },
    });

    return this.http
      .get<any[]>(this.baseUrl, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        params,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return {
            items: this.referenceAdapter.getReferencesFromRawJson(
              response.body || []
            ),
            totalCount: response.headers.get('X-Total-Count') || 0,
            options: options,
          } as GetAllResponse<Reference>;
        })
      );
  }

  getOneById(id: number): Observable<Reference> {
    return this.http
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(
        map((rawReference) =>
          this.referenceAdapter.getReferenceFromRawJson(rawReference)
        )
      );
  }

  removeOneById(id: number): Observable<Reference> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        map((rawReference) =>
          this.referenceAdapter.getReferenceFromRawJson(rawReference)
        )
      );
  }

  saveOne(reference: Reference): Observable<Reference> {
    return reference.id ? this.updateOne(reference) : this.createOne(reference);
  }

  private createOne(reference: Reference): Observable<Reference> {
    return this.http.post<Reference>(
      `${this.baseUrl}`,
      this.referenceAdapter.getRawJsonFromReference(reference)
    );
  }

  private updateOne(reference: Reference): Observable<Reference> {
    return this.http.put<Reference>(
      `${this.baseUrl}/${reference.id}`,
      this.referenceAdapter.getRawJsonFromReference(reference)
    );
  }
}
