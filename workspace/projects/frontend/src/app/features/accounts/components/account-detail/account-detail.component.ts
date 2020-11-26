import {
  Component,
  Input,
  EventEmitter,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';

import { Role } from 'projects/frontend/src/app/core/auth/model/role.enum';
import { AuthenticationService } from 'projects/frontend/src/app/core/auth/services/authentication.service';
import { Account } from '../../model/account';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['account-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountDetailComponent implements OnChanges {
  @Input() account: Account | undefined;
  @Output() unselect = new EventEmitter<string>();
  @Output() save = new EventEmitter<Account>();

  addMode = false;
  editingAccount: Account | undefined;
  password: string | undefined;
  Role = Role;

  constructor(public authService: AuthenticationService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.account && this.account.id) {
      this.editingAccount = { ...this.account };
      this.password = '';
      this.addMode = false;
    } else {
      this.editingAccount = {
        id: '',
        name: '',
        role: Role.anonymous,
        email: '',
      };
      this.password = undefined;
      this.addMode = true;
    }
  }

  clear(): void {
    this.unselect.emit();
  }

  saveAccountInMockedDB(uid: string): void {
    this.editingAccount!.id = uid;
    this.save.emit(this.editingAccount);
    this.clear();
  }

  saveAccount(): void {
    // this.authService.doRegister(this.editingAccount.email, this.password).then(
    //   (res) => {
    //     this.saveAccountInMockedDB(res.user.uid);
    //     // this.errorMessage = '';
    //     // this.successMessage = 'Your account has been created';
    //   },
    //   (err) => {
    //     console.log(err);
    //     // this.errorMessage = err.message;
    //     // this.successMessage = '';
    //   }
    // );
  }
}
