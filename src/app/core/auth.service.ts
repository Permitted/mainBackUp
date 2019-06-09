import { Injectable } from '@angular/core';
// Firebase
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
// Router
import { Router } from '@angular/router';
// Observable & SwitchMap
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// User
import { User } from './user';

@Injectable()
export class AuthService {
  user: Observable<User>;
  isSignedIn: boolean;
  userID: string;

  constructor(
    private afAuth: AngularFireAuth, // fireAuth
    private router: Router, // Router
    private afs: AngularFirestore // Firestore
  ) {
    // Checks user value for changes & auth
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // User email-password signup
  signup(email: string, password: string) {
    this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.router.navigate(['/']);
        return this.updateUserData(value.user); // User data created with update
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
  // User email-password login
  login(email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.router.navigate(['/HomePage']);
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
  // User logout
  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']); }
      );
  }

  ///// Role-based Authorization //////

  canRead(user: User): boolean {
    const allowed = ['admin', 'manager', 'staff'];
    return this.checkAuthorization(user, allowed);
  }

  canEdit(user: User): boolean {
    const allowed = ['admin', 'manager'];
    return this.checkAuthorization(user, allowed);
  }

  canDelete(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }

  // Determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles) {
      if (user.role[role]) {
        return true;
      }
    }
    return false;
  }

  // User update
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );
    // User data recognition
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: {
        staff: true,
        manager: false,
        admin: false
      },
      info: {
        name: null,
        surname: null,
        age: null,
      },
    };
    return userRef.set(data); // , { merge: true }
  }
}
