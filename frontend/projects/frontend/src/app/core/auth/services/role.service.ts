import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllOptions } from '../../../core/model/get-all-options';
import { GetAllResponse } from '../../../core/model/get-all-response';
import { Role } from '../model/role';
import { RoleAdapter } from './role-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = `${environment.apiUrl}/roles`;

  constructor(private http: HttpClient, private roleAdapter: RoleAdapter) {}

  getAll(options?: GetAllOptions<Role>): Observable<GetAllResponse<Role>> {
    const params = new HttpParams({
      fromObject: {
        ...(options?.filter && { filter: options.filter }),
        sort: (options?._sort || 'code') + ',' + (options?._order || 'asc'),
        page: String((options?._page || 1) - 1),
        limit: String(options?._limit || 10),
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
            items: this.roleAdapter.getRolesFromRawJson(response.body || []),
            totalCount: response.headers.get('X-Total-Count') || 0,
            options: options,
          } as GetAllResponse<Role>;
        })
      );
  }
}
