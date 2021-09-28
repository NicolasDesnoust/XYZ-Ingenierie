import { Injectable } from '@angular/core';
import { RoleAdapter } from '../../../core/auth/services/role-adapter.service';
import { Account } from '../model/account';

/**
 * Service responsable du mapping des entités de cette SPA vers
 * leur équivalent au format JSON (gérées par l'API REST) et vice-versa.
 */
@Injectable({
  providedIn: 'root',
})
export class AccountAdapter {
  constructor(private roleAdapter: RoleAdapter) {}

  getAccountFromRawJson(rawAccount: any): Account {
    return {
      ...rawAccount,
      roles: this.roleAdapter.getRolesFromRawJson(rawAccount.roles),
    };
  }

  getAccountsFromRawJson(rawAccounts: any[]): Account[] {
    return rawAccounts.map((rawAccount) =>
      this.getAccountFromRawJson(rawAccount)
    );
  }

  getRawJsonFromAccount(account: Account): any {
    return {
      ...account,
      roles: this.roleAdapter.getRawJsonFromRoles(account.roles),
    };
  }

  /**
   * Convertit une string en son équivalent dans l'énumération passée en paramètres.
   */
  // private getEnumFromString<T, K extends string>(
  //   enumObj: { [P in K]: T },
  //   str: string
  // ): T {
  //   const enumKey = str as K;
  //   return enumObj[enumKey];
  // }
}
