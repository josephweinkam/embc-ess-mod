/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AuditAccessRequest } from '../models/audit-access-request';
import { ClothingSupport } from '../models/clothing-support';
import { EvacuationFile } from '../models/evacuation-file';
import { EvacuationFileSearchResult } from '../models/evacuation-file-search-result';
import { EvacuationFileSummary } from '../models/evacuation-file-summary';
import { FoodGroceriesSupport } from '../models/food-groceries-support';
import { FoodRestaurantSupport } from '../models/food-restaurant-support';
import { GetSecurityPhraseResponse } from '../models/get-security-phrase-response';
import { GetSecurityQuestionsResponse } from '../models/get-security-questions-response';
import { IncidentalsSupport } from '../models/incidentals-support';
import { InviteRequest } from '../models/invite-request';
import { LodgingAllowanceSupport } from '../models/lodging-allowance-support';
import { LodgingBilletingSupport } from '../models/lodging-billeting-support';
import { LodgingGroupSupport } from '../models/lodging-group-support';
import { LodgingHotelSupport } from '../models/lodging-hotel-support';
import { Note } from '../models/note';
import { ProcessDigitalSupportsRequest } from '../models/process-digital-supports-request';
import { ProcessPaperReferralsRequest } from '../models/process-paper-referrals-request';
import { ReferralPrintRequestResponse } from '../models/referral-print-request-response';
import { RegistrantLinkRequest } from '../models/registrant-link-request';
import { RegistrantProfile } from '../models/registrant-profile';
import { RegistrantProfileSearchResult } from '../models/registrant-profile-search-result';
import { RegistrationResult } from '../models/registration-result';
import { SearchResults } from '../models/search-results';
import { SupportReprintReason } from '../models/support-reprint-reason';
import { SupportVoidReason } from '../models/support-void-reason';
import { TransportationOtherSupport } from '../models/transportation-other-support';
import { TransportationTaxiSupport } from '../models/transportation-taxi-support';
import { VerifySecurityPhraseRequest } from '../models/verify-security-phrase-request';
import { VerifySecurityPhraseResponse } from '../models/verify-security-phrase-response';
import { VerifySecurityQuestionsRequest } from '../models/verify-security-questions-request';
import { VerifySecurityQuestionsResponse } from '../models/verify-security-questions-response';

@Injectable({
  providedIn: 'root',
})
export class RegistrationsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation registrationsGetRegistrantProfile
   */
  static readonly RegistrationsGetRegistrantProfilePath = '/api/Registrations/registrants/{registrantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsGetRegistrantProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetRegistrantProfile$Response(params: {
    registrantId: string;
  }): Observable<StrictHttpResponse<RegistrantProfile>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsGetRegistrantProfilePath, 'get');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrantProfile>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsGetRegistrantProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetRegistrantProfile(params: {
    registrantId: string;
  }): Observable<RegistrantProfile> {

    return this.registrationsGetRegistrantProfile$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrantProfile>) => r.body as RegistrantProfile)
    );
  }

  /**
   * Path part for operation registrationsUpdateRegistrantProfile
   */
  static readonly RegistrationsUpdateRegistrantProfilePath = '/api/Registrations/registrants/{registrantId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsUpdateRegistrantProfile()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsUpdateRegistrantProfile$Response(params: {
    registrantId: string;
    body?: RegistrantProfile
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsUpdateRegistrantProfilePath, 'post');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsUpdateRegistrantProfile$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsUpdateRegistrantProfile(params: {
    registrantId: string;
    body?: RegistrantProfile
  }): Observable<RegistrationResult> {

    return this.registrationsUpdateRegistrantProfile$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsCreateRegistrantProfile
   */
  static readonly RegistrationsCreateRegistrantProfilePath = '/api/Registrations/registrants';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsCreateRegistrantProfile()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsCreateRegistrantProfile$Response(params?: {
    body?: RegistrantProfile
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsCreateRegistrantProfilePath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsCreateRegistrantProfile$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsCreateRegistrantProfile(params?: {
    body?: RegistrantProfile
  }): Observable<RegistrationResult> {

    return this.registrationsCreateRegistrantProfile$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsSetRegistrantVerified
   */
  static readonly RegistrationsSetRegistrantVerifiedPath = '/api/Registrations/registrants/{registrantId}/verified/{verified}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsSetRegistrantVerified()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSetRegistrantVerified$Response(params: {
    registrantId: string;
    verified: boolean;
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsSetRegistrantVerifiedPath, 'post');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
      rb.path('verified', params.verified, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsSetRegistrantVerified$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSetRegistrantVerified(params: {
    registrantId: string;
    verified: boolean;
  }): Observable<RegistrationResult> {

    return this.registrationsSetRegistrantVerified$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsGetSecurityQuestions
   */
  static readonly RegistrationsGetSecurityQuestionsPath = '/api/Registrations/registrants/{registrantId}/security';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsGetSecurityQuestions()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetSecurityQuestions$Response(params: {
    registrantId: string;
  }): Observable<StrictHttpResponse<GetSecurityQuestionsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsGetSecurityQuestionsPath, 'get');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetSecurityQuestionsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsGetSecurityQuestions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetSecurityQuestions(params: {
    registrantId: string;
  }): Observable<GetSecurityQuestionsResponse> {

    return this.registrationsGetSecurityQuestions$Response(params).pipe(
      map((r: StrictHttpResponse<GetSecurityQuestionsResponse>) => r.body as GetSecurityQuestionsResponse)
    );
  }

  /**
   * Path part for operation registrationsVerifySecurityQuestions
   */
  static readonly RegistrationsVerifySecurityQuestionsPath = '/api/Registrations/registrants/{registrantId}/security';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsVerifySecurityQuestions()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsVerifySecurityQuestions$Response(params: {
    registrantId: string;
    body?: VerifySecurityQuestionsRequest
  }): Observable<StrictHttpResponse<VerifySecurityQuestionsResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsVerifySecurityQuestionsPath, 'post');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VerifySecurityQuestionsResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsVerifySecurityQuestions$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsVerifySecurityQuestions(params: {
    registrantId: string;
    body?: VerifySecurityQuestionsRequest
  }): Observable<VerifySecurityQuestionsResponse> {

    return this.registrationsVerifySecurityQuestions$Response(params).pipe(
      map((r: StrictHttpResponse<VerifySecurityQuestionsResponse>) => r.body as VerifySecurityQuestionsResponse)
    );
  }

  /**
   * Path part for operation registrationsInviteToRegistrantPortal
   */
  static readonly RegistrationsInviteToRegistrantPortalPath = '/api/Registrations/registrants/{registrantId}/invite';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsInviteToRegistrantPortal()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsInviteToRegistrantPortal$Response(params: {
    registrantId: string;
    body?: InviteRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsInviteToRegistrantPortalPath, 'post');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsInviteToRegistrantPortal$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsInviteToRegistrantPortal(params: {
    registrantId: string;
    body?: InviteRequest
  }): Observable<void> {

    return this.registrationsInviteToRegistrantPortal$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsAuditRegistrantAccess
   */
  static readonly RegistrationsAuditRegistrantAccessPath = '/api/Registrations/registrants/{registrantId}/access';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsAuditRegistrantAccess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsAuditRegistrantAccess$Response(params: {
    registrantId: string;
    body?: AuditAccessRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsAuditRegistrantAccessPath, 'post');
    if (params) {
      rb.path('registrantId', params.registrantId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsAuditRegistrantAccess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsAuditRegistrantAccess(params: {
    registrantId: string;
    body?: AuditAccessRequest
  }): Observable<void> {

    return this.registrationsAuditRegistrantAccess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsGetFile
   */
  static readonly RegistrationsGetFilePath = '/api/Registrations/files/{fileId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsGetFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetFile$Response(params: {
    fileId: string;
    needsAssessmentId?: string;
  }): Observable<StrictHttpResponse<EvacuationFile>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsGetFilePath, 'get');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.query('needsAssessmentId', params.needsAssessmentId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<EvacuationFile>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsGetFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetFile(params: {
    fileId: string;
    needsAssessmentId?: string;
  }): Observable<EvacuationFile> {

    return this.registrationsGetFile$Response(params).pipe(
      map((r: StrictHttpResponse<EvacuationFile>) => r.body as EvacuationFile)
    );
  }

  /**
   * Path part for operation registrationsUpdateFile
   */
  static readonly RegistrationsUpdateFilePath = '/api/Registrations/files/{fileId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsUpdateFile()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsUpdateFile$Response(params: {
    fileId: string;
    body?: EvacuationFile
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsUpdateFilePath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsUpdateFile$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsUpdateFile(params: {
    fileId: string;
    body?: EvacuationFile
  }): Observable<RegistrationResult> {

    return this.registrationsUpdateFile$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsGetFiles
   */
  static readonly RegistrationsGetFilesPath = '/api/Registrations/files';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsGetFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetFiles$Response(params?: {
    registrantId?: string;
    manualFileId?: string;
    id?: string;
  }): Observable<StrictHttpResponse<Array<EvacuationFileSummary>>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsGetFilesPath, 'get');
    if (params) {
      rb.query('registrantId', params.registrantId, {});
      rb.query('manualFileId', params.manualFileId, {});
      rb.query('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EvacuationFileSummary>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsGetFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetFiles(params?: {
    registrantId?: string;
    manualFileId?: string;
    id?: string;
  }): Observable<Array<EvacuationFileSummary>> {

    return this.registrationsGetFiles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EvacuationFileSummary>>) => r.body as Array<EvacuationFileSummary>)
    );
  }

  /**
   * Path part for operation registrationsCreateFile
   */
  static readonly RegistrationsCreateFilePath = '/api/Registrations/files';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsCreateFile()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsCreateFile$Response(params?: {
    body?: EvacuationFile
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsCreateFilePath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsCreateFile$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsCreateFile(params?: {
    body?: EvacuationFile
  }): Observable<RegistrationResult> {

    return this.registrationsCreateFile$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsCreateFileNote
   */
  static readonly RegistrationsCreateFileNotePath = '/api/Registrations/files/{fileId}/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsCreateFileNote()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsCreateFileNote$Response(params: {
    fileId: string;
    body?: Note
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsCreateFileNotePath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsCreateFileNote$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsCreateFileNote(params: {
    fileId: string;
    body?: Note
  }): Observable<RegistrationResult> {

    return this.registrationsCreateFileNote$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsUpdateFileNoteContent
   */
  static readonly RegistrationsUpdateFileNoteContentPath = '/api/Registrations/files/{fileId}/notes/{noteId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsUpdateFileNoteContent()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsUpdateFileNoteContent$Response(params: {
    fileId: string;
    noteId: string;
    body?: Note
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsUpdateFileNoteContentPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.path('noteId', params.noteId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsUpdateFileNoteContent$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsUpdateFileNoteContent(params: {
    fileId: string;
    noteId: string;
    body?: Note
  }): Observable<RegistrationResult> {

    return this.registrationsUpdateFileNoteContent$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsSetFileNoteHiddenStatus
   */
  static readonly RegistrationsSetFileNoteHiddenStatusPath = '/api/Registrations/files/{fileId}/notes/{noteId}/hidden';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsSetFileNoteHiddenStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSetFileNoteHiddenStatus$Response(params: {
    fileId: string;
    noteId: string;
    isHidden?: boolean;
  }): Observable<StrictHttpResponse<RegistrationResult>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsSetFileNoteHiddenStatusPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.path('noteId', params.noteId, {});
      rb.query('isHidden', params.isHidden, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<RegistrationResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsSetFileNoteHiddenStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSetFileNoteHiddenStatus(params: {
    fileId: string;
    noteId: string;
    isHidden?: boolean;
  }): Observable<RegistrationResult> {

    return this.registrationsSetFileNoteHiddenStatus$Response(params).pipe(
      map((r: StrictHttpResponse<RegistrationResult>) => r.body as RegistrationResult)
    );
  }

  /**
   * Path part for operation registrationsGetSecurityPhrase
   */
  static readonly RegistrationsGetSecurityPhrasePath = '/api/Registrations/files/{fileId}/security';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsGetSecurityPhrase()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetSecurityPhrase$Response(params: {
    fileId: string;
  }): Observable<StrictHttpResponse<GetSecurityPhraseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsGetSecurityPhrasePath, 'get');
    if (params) {
      rb.path('fileId', params.fileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<GetSecurityPhraseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsGetSecurityPhrase$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetSecurityPhrase(params: {
    fileId: string;
  }): Observable<GetSecurityPhraseResponse> {

    return this.registrationsGetSecurityPhrase$Response(params).pipe(
      map((r: StrictHttpResponse<GetSecurityPhraseResponse>) => r.body as GetSecurityPhraseResponse)
    );
  }

  /**
   * Path part for operation registrationsVerifySecurityPhrase
   */
  static readonly RegistrationsVerifySecurityPhrasePath = '/api/Registrations/files/{fileId}/security';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsVerifySecurityPhrase()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsVerifySecurityPhrase$Response(params: {
    fileId: string;
    body?: VerifySecurityPhraseRequest
  }): Observable<StrictHttpResponse<VerifySecurityPhraseResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsVerifySecurityPhrasePath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<VerifySecurityPhraseResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsVerifySecurityPhrase$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsVerifySecurityPhrase(params: {
    fileId: string;
    body?: VerifySecurityPhraseRequest
  }): Observable<VerifySecurityPhraseResponse> {

    return this.registrationsVerifySecurityPhrase$Response(params).pipe(
      map((r: StrictHttpResponse<VerifySecurityPhraseResponse>) => r.body as VerifySecurityPhraseResponse)
    );
  }

  /**
   * Path part for operation registrationsLinkRegistrantToHouseholdMember
   */
  static readonly RegistrationsLinkRegistrantToHouseholdMemberPath = '/api/Registrations/files/{fileId}/link';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsLinkRegistrantToHouseholdMember()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsLinkRegistrantToHouseholdMember$Response(params: {
    fileId: string;
    body?: RegistrantLinkRequest
  }): Observable<StrictHttpResponse<string>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsLinkRegistrantToHouseholdMemberPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<string>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsLinkRegistrantToHouseholdMember$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsLinkRegistrantToHouseholdMember(params: {
    fileId: string;
    body?: RegistrantLinkRequest
  }): Observable<string> {

    return this.registrationsLinkRegistrantToHouseholdMember$Response(params).pipe(
      map((r: StrictHttpResponse<string>) => r.body as string)
    );
  }

  /**
   * Path part for operation registrationsAuditFileAcccess
   */
  static readonly RegistrationsAuditFileAcccessPath = '/api/Registrations/files/{fileId}/access';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsAuditFileAcccess()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsAuditFileAcccess$Response(params: {
    fileId: string;
    body?: AuditAccessRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsAuditFileAcccessPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsAuditFileAcccess$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsAuditFileAcccess(params: {
    fileId: string;
    body?: AuditAccessRequest
  }): Observable<void> {

    return this.registrationsAuditFileAcccess$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsSearch
   */
  static readonly RegistrationsSearchPath = '/api/Registrations';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsSearch()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearch$Response(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ManualFileId?: string;
  }): Observable<StrictHttpResponse<SearchResults>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsSearchPath, 'get');
    if (params) {
      rb.query('firstName', params.firstName, {});
      rb.query('lastName', params.lastName, {});
      rb.query('dateOfBirth', params.dateOfBirth, {});
      rb.query('ManualFileId', params.ManualFileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SearchResults>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsSearch$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearch(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ManualFileId?: string;
  }): Observable<SearchResults> {

    return this.registrationsSearch$Response(params).pipe(
      map((r: StrictHttpResponse<SearchResults>) => r.body as SearchResults)
    );
  }

  /**
   * Path part for operation registrationsSearchMatchingRegistrants
   */
  static readonly RegistrationsSearchMatchingRegistrantsPath = '/api/Registrations/registrants/matches';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsSearchMatchingRegistrants()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearchMatchingRegistrants$Response(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ManualFileId?: string;
  }): Observable<StrictHttpResponse<Array<RegistrantProfileSearchResult>>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsSearchMatchingRegistrantsPath, 'get');
    if (params) {
      rb.query('firstName', params.firstName, {});
      rb.query('lastName', params.lastName, {});
      rb.query('dateOfBirth', params.dateOfBirth, {});
      rb.query('ManualFileId', params.ManualFileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RegistrantProfileSearchResult>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsSearchMatchingRegistrants$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearchMatchingRegistrants(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ManualFileId?: string;
  }): Observable<Array<RegistrantProfileSearchResult>> {

    return this.registrationsSearchMatchingRegistrants$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RegistrantProfileSearchResult>>) => r.body as Array<RegistrantProfileSearchResult>)
    );
  }

  /**
   * Path part for operation registrationsSearchMatchingEvacuationFiles
   */
  static readonly RegistrationsSearchMatchingEvacuationFilesPath = '/api/Registrations/files/matches';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsSearchMatchingEvacuationFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearchMatchingEvacuationFiles$Response(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ManualFileId?: string;
  }): Observable<StrictHttpResponse<Array<EvacuationFileSearchResult>>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsSearchMatchingEvacuationFilesPath, 'get');
    if (params) {
      rb.query('firstName', params.firstName, {});
      rb.query('lastName', params.lastName, {});
      rb.query('dateOfBirth', params.dateOfBirth, {});
      rb.query('ManualFileId', params.ManualFileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EvacuationFileSearchResult>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsSearchMatchingEvacuationFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearchMatchingEvacuationFiles(params: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    ManualFileId?: string;
  }): Observable<Array<EvacuationFileSearchResult>> {

    return this.registrationsSearchMatchingEvacuationFiles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EvacuationFileSearchResult>>) => r.body as Array<EvacuationFileSearchResult>)
    );
  }

  /**
   * Path part for operation registrationsProcessSupports
   */
  static readonly RegistrationsProcessSupportsPath = '/api/Registrations/files/{fileId}/supports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsProcessSupports()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsProcessSupports$Response(params: {
    fileId: string;
    body?: ProcessDigitalSupportsRequest
  }): Observable<StrictHttpResponse<ReferralPrintRequestResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsProcessSupportsPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReferralPrintRequestResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsProcessSupports$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsProcessSupports(params: {
    fileId: string;
    body?: ProcessDigitalSupportsRequest
  }): Observable<ReferralPrintRequestResponse> {

    return this.registrationsProcessSupports$Response(params).pipe(
      map((r: StrictHttpResponse<ReferralPrintRequestResponse>) => r.body as ReferralPrintRequestResponse)
    );
  }

  /**
   * Path part for operation registrationsProcessPaperReferrals
   */
  static readonly RegistrationsProcessPaperReferralsPath = '/api/Registrations/files/{fileId}/paperreferrals';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsProcessPaperReferrals()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsProcessPaperReferrals$Response(params: {
    fileId: string;
    body?: ProcessPaperReferralsRequest
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsProcessPaperReferralsPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsProcessPaperReferrals$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registrationsProcessPaperReferrals(params: {
    fileId: string;
    body?: ProcessPaperReferralsRequest
  }): Observable<void> {

    return this.registrationsProcessPaperReferrals$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsVoidSupport
   */
  static readonly RegistrationsVoidSupportPath = '/api/Registrations/files/{fileId}/supports/{supportId}/void';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsVoidSupport()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsVoidSupport$Response(params: {
    fileId: string;
    supportId: string;
    voidReason?: SupportVoidReason;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsVoidSupportPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.path('supportId', params.supportId, {});
      rb.query('voidReason', params.voidReason, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsVoidSupport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsVoidSupport(params: {
    fileId: string;
    supportId: string;
    voidReason?: SupportVoidReason;
  }): Observable<void> {

    return this.registrationsVoidSupport$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsCancelSupport
   */
  static readonly RegistrationsCancelSupportPath = '/api/Registrations/files/{fileId}/supports/{supportId}/cancel';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsCancelSupport()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsCancelSupport$Response(params: {
    fileId: string;
    supportId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsCancelSupportPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.path('supportId', params.supportId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsCancelSupport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsCancelSupport(params: {
    fileId: string;
    supportId: string;
  }): Observable<void> {

    return this.registrationsCancelSupport$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsReprintSupport
   */
  static readonly RegistrationsReprintSupportPath = '/api/Registrations/files/{fileId}/supports/{supportId}/reprint';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsReprintSupport()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsReprintSupport$Response(params: {
    fileId: string;
    supportId: string;
    reprintReason?: SupportReprintReason;
    includeSummary?: boolean;
  }): Observable<StrictHttpResponse<ReferralPrintRequestResponse>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsReprintSupportPath, 'post');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.path('supportId', params.supportId, {});
      rb.query('reprintReason', params.reprintReason, {});
      rb.query('includeSummary', params.includeSummary, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ReferralPrintRequestResponse>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsReprintSupport$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsReprintSupport(params: {
    fileId: string;
    supportId: string;
    reprintReason?: SupportReprintReason;
    includeSummary?: boolean;
  }): Observable<ReferralPrintRequestResponse> {

    return this.registrationsReprintSupport$Response(params).pipe(
      map((r: StrictHttpResponse<ReferralPrintRequestResponse>) => r.body as ReferralPrintRequestResponse)
    );
  }

  /**
   * Path part for operation registrationsGetPrint
   */
  static readonly RegistrationsGetPrintPath = '/api/Registrations/files/{fileId}/supports/print/{printRequestId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsGetPrint()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetPrint$Response(params: {
    fileId: string;
    printRequestId: string;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsGetPrintPath, 'get');
    if (params) {
      rb.path('fileId', params.fileId, {});
      rb.path('printRequestId', params.printRequestId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsGetPrint$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsGetPrint(params: {
    fileId: string;
    printRequestId: string;
  }): Observable<void> {

    return this.registrationsGetPrint$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation registrationsSearchSupports
   */
  static readonly RegistrationsSearchSupportsPath = '/api/Registrations/supports';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registrationsSearchSupports()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearchSupports$Response(params?: {
    manualReferralId?: string;
    fileId?: string;
  }): Observable<StrictHttpResponse<Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>>> {

    const rb = new RequestBuilder(this.rootUrl, RegistrationsService.RegistrationsSearchSupportsPath, 'get');
    if (params) {
      rb.query('manualReferralId', params.manualReferralId, {});
      rb.query('fileId', params.fileId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `registrationsSearchSupports$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  registrationsSearchSupports(params?: {
    manualReferralId?: string;
    fileId?: string;
  }): Observable<Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>> {

    return this.registrationsSearchSupports$Response(params).pipe(
      map((r: StrictHttpResponse<Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>>) => r.body as Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>)
    );
  }

}
