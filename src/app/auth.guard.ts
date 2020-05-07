import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private isAuthenticated: boolean;
  constructor(private oauthService: OAuthService, private authService: AuthService, private router: Router) {
    this.authService.isAuthenticated$.subscribe(i => this.isAuthenticated = i);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('in can activate');
      // const hasIdToken = this.oauthService.hasValidIdToken();
      // const hasAccessToken = this.oauthService.hasValidAccessToken();
      // if(hasIdToken && hasAccessToken) {
      //   console.log('logged in');
      //   return true;
      // } else {
      //   console.log('state in auth guard', state.url);
      //   this.router.navigate(['/home']);
      //   return false;
      // }
      return this.authService.isLoaded$
      .pipe(filter(isDone => isDone))
      .pipe(tap(_ => this.isAuthenticated || this.oauthService.initImplicitFlow(state.url)))
      .pipe(tap( _ => console.log('in guard', this.isAuthenticated)))
      .pipe(map(_ => this.isAuthenticated));
  }
  
}
