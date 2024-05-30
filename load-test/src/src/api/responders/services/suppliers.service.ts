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

import { Supplier } from '../models/supplier';
import { SupplierListItem } from '../models/supplier-list-item';
import { SupplierResult } from '../models/supplier-result';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation suppliersGetSuppliers
   */
  static readonly SuppliersGetSuppliersPath = '/api/Suppliers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersGetSuppliers()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersGetSuppliers$Response(params?: {
    legalName?: string;
    gstNumber?: string;
  }): Observable<StrictHttpResponse<Array<SupplierListItem>>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersGetSuppliersPath, 'get');
    if (params) {
      rb.query('legalName', params.legalName, {});
      rb.query('gstNumber', params.gstNumber, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SupplierListItem>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersGetSuppliers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersGetSuppliers(params?: {
    legalName?: string;
    gstNumber?: string;
  }): Observable<Array<SupplierListItem>> {

    return this.suppliersGetSuppliers$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SupplierListItem>>) => r.body as Array<SupplierListItem>)
    );
  }

  /**
   * Path part for operation suppliersCreateSupplier
   */
  static readonly SuppliersCreateSupplierPath = '/api/Suppliers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersCreateSupplier()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  suppliersCreateSupplier$Response(params?: {
    body?: Supplier
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersCreateSupplierPath, 'post');
    if (params) {
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersCreateSupplier$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  suppliersCreateSupplier(params?: {
    body?: Supplier
  }): Observable<SupplierResult> {

    return this.suppliersCreateSupplier$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersGetSupplierById
   */
  static readonly SuppliersGetSupplierByIdPath = '/api/Suppliers/{supplierId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersGetSupplierById()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersGetSupplierById$Response(params: {
    supplierId: string;
  }): Observable<StrictHttpResponse<Supplier>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersGetSupplierByIdPath, 'get');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Supplier>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersGetSupplierById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersGetSupplierById(params: {
    supplierId: string;
  }): Observable<Supplier> {

    return this.suppliersGetSupplierById$Response(params).pipe(
      map((r: StrictHttpResponse<Supplier>) => r.body as Supplier)
    );
  }

  /**
   * Path part for operation suppliersUpdateSupplier
   */
  static readonly SuppliersUpdateSupplierPath = '/api/Suppliers/{supplierId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersUpdateSupplier()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  suppliersUpdateSupplier$Response(params: {
    supplierId: string;
    body?: Supplier
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersUpdateSupplierPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
      rb.body(params.body, 'application/*+json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersUpdateSupplier$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  suppliersUpdateSupplier(params: {
    supplierId: string;
    body?: Supplier
  }): Observable<SupplierResult> {

    return this.suppliersUpdateSupplier$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersRemoveSupplier
   */
  static readonly SuppliersRemoveSupplierPath = '/api/Suppliers/{supplierId}/remove';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersRemoveSupplier()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersRemoveSupplier$Response(params: {
    supplierId: string;
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersRemoveSupplierPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersRemoveSupplier$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersRemoveSupplier(params: {
    supplierId: string;
  }): Observable<SupplierResult> {

    return this.suppliersRemoveSupplier$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersActivateSupplier
   */
  static readonly SuppliersActivateSupplierPath = '/api/Suppliers/{supplierId}/active';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersActivateSupplier()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersActivateSupplier$Response(params: {
    supplierId: string;
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersActivateSupplierPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersActivateSupplier$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersActivateSupplier(params: {
    supplierId: string;
  }): Observable<SupplierResult> {

    return this.suppliersActivateSupplier$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersDeactivateSupplier
   */
  static readonly SuppliersDeactivateSupplierPath = '/api/Suppliers/{supplierId}/inactive';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersDeactivateSupplier()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersDeactivateSupplier$Response(params: {
    supplierId: string;
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersDeactivateSupplierPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersDeactivateSupplier$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersDeactivateSupplier(params: {
    supplierId: string;
  }): Observable<SupplierResult> {

    return this.suppliersDeactivateSupplier$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersClaimSupplier
   */
  static readonly SuppliersClaimSupplierPath = '/api/Suppliers/{supplierId}/claim';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersClaimSupplier()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersClaimSupplier$Response(params: {
    supplierId: string;
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersClaimSupplierPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersClaimSupplier$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersClaimSupplier(params: {
    supplierId: string;
  }): Observable<SupplierResult> {

    return this.suppliersClaimSupplier$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersAddSupplierSharedWithTeam
   */
  static readonly SuppliersAddSupplierSharedWithTeamPath = '/api/Suppliers/{supplierId}/add-team/{sharedTeamId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersAddSupplierSharedWithTeam()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersAddSupplierSharedWithTeam$Response(params: {
    supplierId: string;
    sharedTeamId: string;
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersAddSupplierSharedWithTeamPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
      rb.path('sharedTeamId', params.sharedTeamId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersAddSupplierSharedWithTeam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersAddSupplierSharedWithTeam(params: {
    supplierId: string;
    sharedTeamId: string;
  }): Observable<SupplierResult> {

    return this.suppliersAddSupplierSharedWithTeam$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

  /**
   * Path part for operation suppliersRemoveSupplierSharedWithTeam
   */
  static readonly SuppliersRemoveSupplierSharedWithTeamPath = '/api/Suppliers/{supplierId}/remove-team/{sharedTeamId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `suppliersRemoveSupplierSharedWithTeam()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersRemoveSupplierSharedWithTeam$Response(params: {
    supplierId: string;
    sharedTeamId: string;
  }): Observable<StrictHttpResponse<SupplierResult>> {

    const rb = new RequestBuilder(this.rootUrl, SuppliersService.SuppliersRemoveSupplierSharedWithTeamPath, 'post');
    if (params) {
      rb.path('supplierId', params.supplierId, {});
      rb.path('sharedTeamId', params.sharedTeamId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SupplierResult>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `suppliersRemoveSupplierSharedWithTeam$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  suppliersRemoveSupplierSharedWithTeam(params: {
    supplierId: string;
    sharedTeamId: string;
  }): Observable<SupplierResult> {

    return this.suppliersRemoveSupplierSharedWithTeam$Response(params).pipe(
      map((r: StrictHttpResponse<SupplierResult>) => r.body as SupplierResult)
    );
  }

}
