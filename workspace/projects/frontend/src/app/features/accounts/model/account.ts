import { Role } from '../../../core/auth/model/role.enum';

export interface Account {
  id: string;
  name: string;
  email: string;
  role: Role;
}
