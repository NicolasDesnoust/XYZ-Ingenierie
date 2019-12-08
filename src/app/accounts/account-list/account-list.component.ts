import { Account } from './../../core/model/account';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ChangeDetectionStrategy
} from '@angular/core';
import { Role } from 'src/app/auth/role.enum';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListComponent {
  @Input() accounts: Account[];
  @Input() selectedAccount: Account;
  @Output() deleted = new EventEmitter<Account>();
  @Output() selected = new EventEmitter<Account>();

  Role = Role;

  selectAccount(account: Account) {
    this.selected.emit(account);
  }

  deleteAccount(account: Account) {
    this.deleted.emit(account);
  }

  byId(account: Account) {
    return account.id;
  }
}
