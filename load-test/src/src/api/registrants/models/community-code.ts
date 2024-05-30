/* tslint:disable */
/* eslint-disable */
import { CommunityType } from './community-type';
export interface CommunityCode {
  communityType?: CommunityType;
  countryCode?: null | string;
  description?: null | string;
  districtName?: null | string;
  isActive?: boolean;
  stateProvinceCode?: null | string;
  value?: null | string;
}
