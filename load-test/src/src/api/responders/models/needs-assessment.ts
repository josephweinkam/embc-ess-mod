/* tslint:disable */
/* eslint-disable */
import { EvacuationFileHouseholdMember } from './evacuation-file-household-member';
import { IdentifiedNeed } from './identified-need';
import { InsuranceOption } from './insurance-option';
import { NeedsAssessmentType } from './needs-assessment-type';
import { Pet } from './pet';
export interface NeedsAssessment {
  createdOn?: null | string;
  householdMembers: Array<EvacuationFileHouseholdMember>;
  id?: null | string;
  insurance: InsuranceOption;
  modifiedOn?: null | string;
  needs?: null | Array<IdentifiedNeed>;
  pets?: null | Array<Pet>;
  reviewingTeamMemberDisplayName?: null | string;
  reviewingTeamMemberId?: null | string;
  type?: NeedsAssessmentType;
}
