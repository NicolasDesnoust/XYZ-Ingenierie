import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllOptions } from '../../../core/model/get-all-options';
import { GetAllResponse } from '../../../core/model/get-all-response';
import { Domain } from '../model/domain';

@Injectable({
  providedIn: 'root',
})
export class DomainService {
  private baseUrl = `${environment.apiUrl}/domains`;

  constructor(private http: HttpClient) {}

  getAll(options?: GetAllOptions<Domain>): Observable<GetAllResponse<Domain>> {
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
            items: response.body || [],
            totalCount: response.headers.get('X-Total-Count') || 0,
            options: options,
          } as GetAllResponse<Domain>;
        })
      );
  }
}
