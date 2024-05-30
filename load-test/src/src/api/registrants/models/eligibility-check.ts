/* tslint:disable */
/* eslint-disable */
import { SelfServeSupportSetting } from './self-serve-support-setting';
export interface EligibilityCheck {
  evacuationFileId?: null | string;
  from?: null | string;
  isEligable?: boolean;
  supportSettings?: null | Array<SelfServeSupportSetting>;
  taskNumber?: null | string;
  to?: null | string;
}
