import { Role } from './../../auth/role.enum';

export class Account {
  id: string;
  name: string;
  email: string;
  role: Role;
}
