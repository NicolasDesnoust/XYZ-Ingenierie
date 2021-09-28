import { Injectable } from '@angular/core';
import { Privilege } from '../model/privilege';
import { PrivilegeCode } from '../model/privilege-code.enum';

@Injectable({
  providedIn: 'root',
})
export class PrivilegeAdapter {
  getPrivilegeFromRawJson(rawPrivilege: any): Privilege {
    return {
      ...rawPrivilege,
      code: this.getEnumFromString(PrivilegeCode, rawPrivilege.code)
    };
  }

  getPrivilegesFromRawJson(rawPrivileges: any[]): Privilege[] {
    return rawPrivileges.map((rawPrivilege) => this.getPrivilegeFromRawJson(rawPrivilege));
  }

  getRawJsonFromPrivilege(privilege: Privilege): any {
    return {
      ...privilege,
    };
  }

  getRawJsonFromPrivileges(privileges: Privilege[]): any {
    return privileges.map((privilege) => this.getRawJsonFromPrivilege(privilege));
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
