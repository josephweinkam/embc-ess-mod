import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { RegistrationsService } from 'src/app/core/api/services';
import {
  EvacuationFileSummary,
  RegistrantProfile,
  RegistrationResult
} from '../api/models';
import { EvacuationFileSummaryModel } from '../models/evacuation-file-summary.model';
import { RegistrantProfileModel } from '../models/registrant-profile.model';
import { LocationsService } from './locations.service';

@Injectable({
  providedIn: 'root'
})
export class EvacueeProfileService {
  constructor(
    private registrationsService: RegistrationsService,
    private locationsService: LocationsService
  ) {}

  /**
   * Fetches profile record from API and maps the location codes
   * to description
   *
   * @returns profile record
   */
  public getProfileFromId(
    profileId: string
  ): Observable<RegistrantProfileModel> {
    return this.registrationsService
      .registrationsGetRegistrantProfile({
        registrantId: profileId
      })
      .pipe(
        map(
          (profile: RegistrantProfile): RegistrantProfileModel => {
            return {
              ...profile,
              primaryAddress: this.locationsService.getAddressModelFromAddress(
                profile.primaryAddress
              ),
              mailingAddress: this.locationsService.getAddressModelFromAddress(
                profile.mailingAddress
              )
            };
          }
        )
      );
  }

  /**
   * Create new profile and fetches the created profile
   *
   * @param regProfile Registrant Profile data to send to API
   *
   * @returns API profile mapped as EvacueeProfile
   */
  public createProfile(
    regProfile: RegistrantProfile
  ): Observable<RegistrantProfileModel> {
    return this.registrationsService
      .registrationsCreateRegistrantProfile({ body: regProfile })
      .pipe(
        mergeMap((regResult: RegistrationResult) =>
          this.getProfileFromId(regResult.id)
        )
      );
  }

  /**
   * Update existing profile
   *
   * @param registrantId ID of Registrant Profile to update
   * @param regProfile Registrant Profile data to send to API
   *
   * @returns API profile mapped as EvacueeProfile
   */
  public updateProfile(
    registrantId: string,
    regProfile: RegistrantProfile
  ): Observable<RegistrantProfileModel> {
    return this.registrationsService
      .registrationsUpdateRegistrantProfile({
        registrantId,
        body: regProfile
      })
      .pipe(
        mergeMap((regResult: RegistrationResult) =>
          this.getProfileFromId(regResult.id)
        )
      );
  }

  /**
   *
   * @param registrantId ID of Registrant Profile to set the verification flag
   * @param verified boolean response to set
   * @returns API profile mapped as EvacueeProfile
   */
  public setVerifiedStatus(
    registrantId: string,
    verified: boolean
  ): Observable<RegistrantProfileModel> {
    return this.registrationsService
      .registrationsSetRegistrantVerified({
        registrantId,
        verified
      })
      .pipe(
        mergeMap((regResult: RegistrationResult) =>
          this.getProfileFromId(regResult.id)
        )
      );
  }

  /**
   *
   * @param registrantId ID of Registrant Profile
   * @returns an Array of matched ESS Files with the Registrant ID
   */
  public getProfileFiles(
    registrantId: string
  ): Observable<Array<EvacuationFileSummaryModel>> {
    const evacFileSummaryModelArray: Array<EvacuationFileSummaryModel> = [];
    return this.registrationsService
      .registrationsGetFiles({
        registrantId
      })
      .pipe(
        map(
          (
            response: Array<EvacuationFileSummary>
          ): Array<EvacuationFileSummaryModel> => {
            response.forEach((item) => {
              const evacFileSummary: EvacuationFileSummaryModel = {
                createdOn: item.createdOn,
                evacuatedFromAddress: this.locationsService.getAddressModelFromAddress(
                  item.evacuatedFromAddress
                ),
                evacuationFileDate: item.evacuationFileDate,
                id: item.id,
                isRestricted: item.isRestricted,
                status: item.status,
                task: item.task
              };
              evacFileSummaryModelArray.push(evacFileSummary);
            });
            return evacFileSummaryModelArray;
          }
        )
      );
  }
}
