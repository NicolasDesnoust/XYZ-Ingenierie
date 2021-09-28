import { Role } from "../../../core/auth/model/role";

export interface Account {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  roles: Role[];
}
