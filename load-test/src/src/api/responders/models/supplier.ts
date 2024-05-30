/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { MutualAid } from './mutual-aid';
import { SupplierContact } from './supplier-contact';
import { SupplierStatus } from './supplier-status';
import { SupplierTeamDetails } from './supplier-team-details';
export interface Supplier {
  address?: Address;
  contact?: SupplierContact;
  gstNumber?: null | string;
  id?: null | string;
  legalName?: null | string;
  mutualAids?: null | Array<MutualAid>;
  name?: null | string;
  primaryTeams?: null | Array<SupplierTeamDetails>;
  status?: SupplierStatus;
}
