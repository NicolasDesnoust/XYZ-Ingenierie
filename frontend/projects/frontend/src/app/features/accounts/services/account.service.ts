import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/frontend/src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GetAllOptions } from '../../../core/model/get-all-options';
import { GetAllResponse } from '../../../core/model/get-all-response';
import { Account } from '../model/account';
import { AccountAdapter } from './account-adapter.service';

/**
 * Service responsable d'opérations CRUD basiques sur les comptes utilisateurs
 * à travers l'API REST du back-end.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(
    private http: HttpClient,
    private accountAdapter: AccountAdapter
  ) {}

  getAll(
    options?: GetAllOptions<Account>
  ): Observable<GetAllResponse<Account>> {
    const params = new HttpParams({
      fromObject: {
        ...(options?.filter && { filter: options.filter }),
        sort: (options?._sort || 'lastname') + "," + (options?._order || 'asc'),
        page: String((options?._page || 1) - 1),
        limit: String(options?._limit || 10),
      },
    });

    return this.http.get<any[]>(this.baseUrl, {
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      params,
      observe: 'response'
    })
      .pipe(
        map((response) => {
          return {
            items: this.accountAdapter.getAccountsFromRawJson(
              response.body || []
            ),
            totalCount: response.headers.get('X-Total-Count') || 0,
            options: options,
          } as GetAllResponse<Account>;
        })
      );
  }

  getOneById(id: number): Observable<Account> {
    return this.http
      .get<any>(`${this.baseUrl}/${id}`)
      .pipe(
        map((rawAccount) =>
          this.accountAdapter.getAccountFromRawJson(rawAccount)
        )
      );
  }

  removeOneById(id: number): Observable<Account> {
    return this.http
      .delete<any>(`${this.baseUrl}/${id}`)
      .pipe(
        map((rawAccount) =>
          this.accountAdapter.getAccountFromRawJson(rawAccount)
        )
      );
  }

  saveOne(account: Account): Observable<Account> {
    return account.id ? this.updateOne(account) : this.createOne(account);
  }

  private createOne(account: Account): Observable<Account> {
    return this.http.post<Account>(
      `${this.baseUrl}`,
      this.accountAdapter.getRawJsonFromAccount(account)
    );
  }

  private updateOne(account: Account): Observable<Account> {
    return this.http.put<Account>(
      `${this.baseUrl}/${account.id}`,
      this.accountAdapter.getRawJsonFromAccount(account)
    );
  }
}
