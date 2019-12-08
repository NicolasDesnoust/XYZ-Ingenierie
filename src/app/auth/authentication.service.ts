import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import 'rxjs/add/operator/toPromise';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { AccountService } from '../accounts/account.service';
import { Account } from '../core/model/account';
import { tap, map, take } from 'rxjs/operators';
import { Role } from './role.enum';

@Injectable()
export class AuthenticationService {

  currentAccount$: Observable<Account>;
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private accountService: AccountService,
              private router: Router) {
    this.user$ = this.afAuth.authState;
/*
    this.currentAccount$ = accountService.getByKey(
      this.user$..uid
      );
*/

    this.currentAccount$ = this.user$.pipe(
      switchMap(res => {
        if (res) {
          return accountService.getByKey(res.uid);
        } else {
          return new Observable<Account>(observer => {
            observer.next(undefined);
          });
        }
      })
    );
   /* firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        accountService.getByKey(user.uid).toPromise().then((res) =>
          this.currentAccount = res
        );
        console.log(user.uid);
        console.log(this.currentAccount);
      } else {
        this.user = undefined;
        this.currentAccount = undefined;
      }
    }); */
  }

  doRegister(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {

      let secondaryApp = firebase.initializeApp(environment.firebase, 'Secondary');

      secondaryApp.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        secondaryApp.auth().signOut();
        resolve(res);
      }, err => reject(err));
    });

     /* firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });*/
  }

  doLogin(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }
}

