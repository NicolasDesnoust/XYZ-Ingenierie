import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
})
export class AccountsComponent implements OnInit {
  selected: Account | undefined;
  accounts$: Observable<Account[]>;
  message = '?';
  accountToDelete: Account | undefined;
  showModal = false;

  constructor(
    private accountService: AccountService // , private modalService: ModalService
  ) {
    this.accounts$ = accountService.entities$;
  }

  ngOnInit(): void {
    this.getAccounts();
  }

  add(account: Account): void {
    this.accountService.add(account);
  }

  askToDelete(account: Account): void {
    this.accountToDelete = account;
    this.showModal = true;
    if (this.accountToDelete.name) {
      this.message = `Voulez-vous supprimer le compte de ${this.accountToDelete.name}?`;
    }
  }

  clear(): void {
    this.selected = undefined;
  }

  closeModal(): void {
    this.showModal = false;
  }

  deleteAccount(): void {
    this.closeModal();
    if (this.accountToDelete) {
      this.accountService
        .delete(this.accountToDelete.id)
        .subscribe(() => (this.accountToDelete = undefined));
    }
    this.clear();
  }

  enableAddMode(): void {
    this.selected = <any>{};
  }

  getAccounts(): void {
    this.accountService.getAll();
    this.clear();
  }

  save(account: Account): void {
    if (this.selected && this.selected.name) {
      this.update(account);
    } else {
      this.add(account);
    }
  }

  select(account: Account): void {
    this.selected = account;
  }

  update(account: Account): void {
    this.accountService.update(account);
  }
}
