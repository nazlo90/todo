import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import {User} from 'firebase/app';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable()
export class AuthService {
  user: Observable<User>;
  readonly srorageAuthKey = 'user';

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private route: ActivatedRoute) {
    this.user = firebaseAuth.authState;
  }

  userId(): string {
    return localStorage.getItem(this.srorageAuthKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.srorageAuthKey);
  }

  signup(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['../login'], {
      relativeTo: this.route
    });
    this.firebaseAuth
      .auth
      .signOut();
  }
}
