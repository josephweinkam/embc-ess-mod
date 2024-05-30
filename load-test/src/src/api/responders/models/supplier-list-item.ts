/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { MutualAid } from './mutual-aid';
import { SupplierStatus } from './supplier-status';
import { SupplierTeamDetails } from './supplier-team-details';
export interface SupplierListItem {
  address?: Address;
  gstNumber?: null | string;
  id?: null | string;
  isPrimarySupplier?: boolean;
  legalName?: null | string;
  mutualAid?: MutualAid;
  name?: null | string;
  primaryTeams?: null | Array<SupplierTeamDetails>;
  providesMutualAid?: boolean;
  status?: SupplierStatus;
}
