/* tslint:disable */
/* eslint-disable */
import { MemberLabel } from './member-label';
import { MemberRole } from './member-role';
export interface TeamMember {
  agreementSignDate?: null | string;
  email?: null | string;
  firstName: string;
  id?: null | string;
  isActive?: boolean;
  isUserNameEditable?: boolean;
  label?: MemberLabel;
  lastName: string;
  lastSuccessfulLogin?: null | string;
  phone?: null | string;
  role: MemberRole;
  teamId?: null | string;
  teamName?: null | string;
  userName: string;
}
