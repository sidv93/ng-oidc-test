import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    //   this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
    //     if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
    //       this.oauthService.initImplicitFlow('some-state');
    //     }
    // });
  }

}
