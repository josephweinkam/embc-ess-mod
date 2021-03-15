import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserProfile } from '../api/models';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(
    private oauthService: OAuthService,
    private authConfig: AuthConfig,
    private userService: UserService,
    private router: Router) { }

  public ensureLoggedIn(): Promise<void> {

    this.oauthService.configure(this.authConfig);
    this.oauthService.setStorage(sessionStorage);
    // this.oauthService.tokenValidationHandler = new NullValidationHandler();
    return this.oauthService.loadDiscoveryDocumentAndLogin().then(isLoggedIn => {
      console.log('isLoggedIn', isLoggedIn);
      if (isLoggedIn) {
        this.oauthService.setupAutomaticSilentRefresh();
        return this.userService.loadUserProfile().toPromise().then(userProfile => {
          this.router.navigateByUrl(this.resolveNextRoute(userProfile)).then(_ => Promise.resolve());
        });
      } else {
        return Promise.reject('Not logged in');
      }
    });
  }

  public logout(): void {
    this.oauthService.logOut();
  }

  private resolveNextRoute(userProfile: UserProfile): string {
    return userProfile.lastSuccessfulLogin ? 'responder-access' : 'electronic-agreement';
  }
}
