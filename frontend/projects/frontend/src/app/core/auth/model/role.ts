import { Privilege } from "./privilege";

export interface Role {
  id: number;
  code: string;
  name: string;
  privileges: Privilege[];
}
