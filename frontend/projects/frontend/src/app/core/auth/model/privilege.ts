import { PrivilegeCode } from "./privilege-code.enum";

export interface Privilege {
  id: number;
  code: PrivilegeCode;
  name: string;
}
