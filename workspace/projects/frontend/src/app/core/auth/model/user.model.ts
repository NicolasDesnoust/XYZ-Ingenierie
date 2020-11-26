import { Roles } from './roles.interface';

export interface User {
  email: string;
  photoURL: string;
  roles: Roles;
}
