import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Role } from 'projects/frontend/src/app/core/auth/model/role.enum';
import { Account } from './../../model/account';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountListComponent {
  @Input()
  accounts: Account[] = [];
  @Input() selectedAccount: Account | undefined;
  @Output() deleted = new EventEmitter<Account>();
  @Output() selected = new EventEmitter<Account>();

  Role = Role;

  selectAccount(account: Account): void {
    this.selected.emit(account);
  }

  deleteAccount(account: Account): void {
    this.deleted.emit(account);
  }

  byId(account: Account): string {
    return account.id;
  }
}
