import { Injectable } from '@angular/core';
// Can Formation
import { CanActivate } from '@angular/router';
// Router
import { Router } from '@angular/router';
// Observable & Auth
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
// Operators
import {tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}
  canActivate(next, state): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map(user => !!user), // <-- Map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.router.navigate(['']);
        }
    })

    );
  }
}
