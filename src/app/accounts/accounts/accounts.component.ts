import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html'
})
export class AccountsComponent implements OnInit {
  selected: Account;
  accounts$: Observable<Account[]>;
  message = '?';
  accountToDelete: Account;
  showModal = false;

  constructor(
    private accountService: AccountService // , private modalService: ModalService
  ) {
    this.accounts$ = accountService.entities$;
  }

  ngOnInit() {
    this.getAccounts();
  }

  add(account: Account) {
    this.accountService.add(account);
  }

  askToDelete(account: Account) {
    this.accountToDelete = account;
    this.showModal = true;
    if (this.accountToDelete.name) {
      this.message = `Voulez-vous supprimer le compte de ${this.accountToDelete.name}?`;
    }
  }

  clear() {
    this.selected = null;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteAccount() {
    this.closeModal();
    if (this.accountToDelete) {
      this.accountService
        .delete(this.accountToDelete.id)
        .subscribe(() => (this.accountToDelete = null));
    }
    this.clear();
  }

  enableAddMode() {
    this.selected = <any>{};
  }

  getAccounts() {
    this.accountService.getAll();
    this.clear();
  }

  save(account: Account) {
    if (this.selected && this.selected.name) {
      this.update(account);
    } else {
      this.add(account);
    }
  }

  select(account: Account) {
    this.selected = account;
  }

  update(account: Account) {
    this.accountService.update(account);
  }
}
