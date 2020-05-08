import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean;
  constructor(private oauthService: OAuthService, private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authService.isLoaded$
      .pipe(filter(isDone => isDone))
      .pipe(tap(_ => this.isAuthenticated || this.oauthService.initImplicitFlow(state.url)))
      .pipe(map(_ => this.isAuthenticated));
  }
  
}
