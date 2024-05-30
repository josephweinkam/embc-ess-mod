/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { EvacuationFileSearchResult } from './evacuation-file-search-result';
import { RegistrantStatus } from './registrant-status';
export interface RegistrantProfileSearchResult {
  createdOn?: string;
  evacuationFiles?: null | Array<EvacuationFileSearchResult>;
  firstName?: null | string;
  id?: null | string;
  isAuthenticated?: boolean;
  isProfileCompleted?: boolean;
  isRestricted?: boolean;
  lastName?: null | string;
  modifiedOn?: string;
  primaryAddress?: Address;
  status?: RegistrantStatus;
}
