import { Roles } from './roles.interface';

export class User {
    email: string;
    photoURL: string;
    roles: Roles;

    constructor(authData) {
      this.roles = { employee: true };
    }
}
