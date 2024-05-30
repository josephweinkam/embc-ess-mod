/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { SupportDelivery } from './support-delivery';
import { SupportMethod } from './support-method';
export type Referral = SupportDelivery & {
'manualReferralId'?: string | null;
'method': SupportMethod;
'supplierId': string;
'supplierName'?: string | null;
'supplierLegalName'?: string | null;
'supplierAddress'?: Address;
'supplierNotes'?: string | null;
'issuedToPersonName': string;
};
