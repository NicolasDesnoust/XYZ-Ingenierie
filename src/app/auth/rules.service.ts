import { Account } from './../core/model/account';
import { Injectable } from '@angular/core';
import { Role } from './role.enum';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor() { }

  ///// Role-based Authorization //////

  canReadFullRefs(account: Account): boolean {
    const allowed = ['admin', 'manager', 'employee'];
    return this.checkAuthorization(account, allowed);
  }

  canSearchFullRefs(account: Account): boolean {
    const allowed = ['admin', 'manager', 'employee'];
    return this.checkAuthorization(account, allowed);
  }

  canManageRefs(account: Account): boolean {
    const allowed = ['admin', 'manager'];
    return this.checkAuthorization(account, allowed);
  }

  canManageAccounts(account: Account): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(account, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(account: Account, allowedRoles: string[]): boolean {
    if (!account) {
      return false;
    }

    for (const role of allowedRoles) {
      if ( account.role === role ) {
        return true;
      }
    }
    return false;
  }
}
