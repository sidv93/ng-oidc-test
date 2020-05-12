import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-oidc-test';
  constructor(private authService: AuthService) {
    this.authService.initLoginFlow();
  }

  public logout() {
    this.authService.logout();
  }
}
