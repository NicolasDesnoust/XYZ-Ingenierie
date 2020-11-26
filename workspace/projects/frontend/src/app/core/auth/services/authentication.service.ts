import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Account } from '../../../features/accounts/model/account';
import { AccountService } from '../../../features/accounts/services/account.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  currentAccount$: Observable<Account>;
  user$: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private accountService: AccountService,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState;
    /*
    this.currentAccount$ = accountService.getByKey(
      this.user$..uid
      );
*/

    this.currentAccount$ = this.user$.pipe(
      switchMap((res) => {
        if (res) {
          return accountService.getByKey(res.uid);
        } else {
          return new Observable<Account>((observer) => {
            observer.next(undefined);
          });
        }
      })
    );
  }

  doLogin(email: string, password: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(email, password).then(
        (res) => {
          resolve(res);
        },
        (err) => reject(err)
      );
    });
  }

  doLogout(): Promise<void> {
    return new Promise((resolve, reject) => {
        this.afAuth.signOut();
        resolve();
    });
  }
}
