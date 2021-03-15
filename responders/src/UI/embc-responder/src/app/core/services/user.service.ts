import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserProfile } from '../api/models/user-profile';
import { SecurityService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private profile?: LoggedInUserProfile = null;

  constructor(private securityService: SecurityService) { }

  public loadUserProfile(): Observable<UserProfile> {
    return this.securityService.securityGetCurrentUserProfile().pipe(tap(response => {
      this.profile = { ...response, taskNumber: null };
    }));
  }

  public get currentProfile(): LoggedInUserProfile {
    return this.profile;
  }

}

export interface LoggedInUserProfile {
  firstName?: string;
  id?: string;
  lastName?: string;
  lastSuccessfulLogin?: string;
  teamId?: string;
  teamName?: string;
  userName?: string;
  taskNumber?: string;
}
