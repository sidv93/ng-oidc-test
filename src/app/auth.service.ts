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
    console.log('has valid access tokens', this.oauthService.hasValidAccessToken());
    this.isAuthenticatedSubject$.next(this.oauthService.hasValidAccessToken())
    this.isLoadedSubject$.next(true);
    console.log('in login flow', this.oauthService.state);
    if(this.oauthService.hasValidAccessToken() && this.oauthService.state) {
      console.log('router', this.router.url, 'state', this.oauthService.state);
      this.router.navigate([decodeURIComponent(this.oauthService.state)]);
    }
  }
}
