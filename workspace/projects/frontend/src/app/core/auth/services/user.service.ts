import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth) {}

  // getCurrentUser(): Promise<any> {
  //   return new Promise<any>((resolve, reject) => {
  //     const currentUser = .onAuthStateChanged((user) => {
  //       if (user) {
  //         resolve(user);
  //       } else {
  //         reject('No user logged in');
  //       }
  //     });
  //   });
  // }

  // updateCurrentUser(value) {
  //   return new Promise<any>((resolve, reject) => {
  //     const user = firebase.auth().currentUser;
  //     user
  //       .updateProfile({
  //         displayName: value.name,
  //         photoURL: user.photoURL,
  //       })
  //       .then(
  //         (res) => {
  //           resolve(res);
  //         },
  //         (err) => reject(err)
  //       );
  //   });
  // }
  /*
  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        anonymous: true
      }
    };
    return userRef.set(data, { merge: true });
  } */
}
