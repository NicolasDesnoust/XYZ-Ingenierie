import { Injectable } from '@angular/core';
import { Role } from '../model/role';

@Injectable({
  providedIn: 'root',
})
export class RoleAdapter {
  getRoleFromRawJson(rawRole: any): Role {
    return {
      ...rawRole,
    };
  }

  getRolesFromRawJson(rawRoles: any[]): Role[] {
    return rawRoles.map((rawRole) => this.getRoleFromRawJson(rawRole));
  }

  getRawJsonFromRole(role: Role): any {
    return {
      ...role,
    };
  }

  getRawJsonFromRoles(roles: Role[]): any {
    return roles.map((role) => this.getRawJsonFromRole(role));
  }

  /**
   * Convertit une string en son équivalent dans l'énumération passée en paramètres.
   */
  private getEnumFromString<T, K extends string>(
    enumObj: { [P in K]: T },
    str: string
  ): T {
    const enumKey = str as K;
    return enumObj[enumKey];
  }
}
