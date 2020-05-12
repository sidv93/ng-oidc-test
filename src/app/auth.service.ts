import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './auth.config';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoadedSubject$ = new ReplaySubject<boolean>();
  public isLoaded$ = this.isLoadedSubject$.asObservable();
  
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();
  constructor(private oauthService: OAuthService, private router: Router) { 
  }

  public async initLoginFlow() {
    this.oauthService.configure(authCodeFlowConfig);
    await this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken())
    this.isLoadedSubject$.next(true);
    if(this.oauthService.hasValidAccessToken() && this.oauthService.state) {
      this.router.navigate([decodeURIComponent(this.oauthService.state)]);
    }
  }

  public logout() {
    this.oauthService.logOut();
  }
}
