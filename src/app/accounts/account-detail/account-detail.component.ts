import { Role } from './../../auth/role.enum';
import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import { Account } from '../../core';
import { AuthenticationService } from 'src/app/auth/authentication.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['account-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailComponent implements OnChanges {
  @Input() account: Account;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Account>();

  addMode = false;
  editingAccount: Account;
  password: string;
  Role = Role;

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.account && this.account.id) {
      this.editingAccount = { ...this.account };
      this.password = '';
      this.addMode = false;
    } else {
      this.editingAccount = { id: undefined, name: '', role: Role.anonymous , email: ''};
      this.password = undefined;
      this.addMode = true;
    }
  }

  clear() {
    this.unselect.emit();
  }

  saveAccountInMockedDB(uid: string) {
    this.editingAccount.id = uid;
    this.save.emit(this.editingAccount);
    this.clear();
  }

  saveAccount() {
    this.authService.doRegister(this.editingAccount.email, this.password)
      .then(res => {
        this.saveAccountInMockedDB(res.user.uid);
       // this.errorMessage = '';
       // this.successMessage = 'Your account has been created';
      }, err => {
        console.log(err);
       // this.errorMessage = err.message;
       // this.successMessage = '';
    });

  }
}
