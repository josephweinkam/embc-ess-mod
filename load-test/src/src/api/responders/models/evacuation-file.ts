/* tslint:disable */
/* eslint-disable */
import { Address } from './address';
import { ClothingSupport } from './clothing-support';
import { EvacuationFileHouseholdMember } from './evacuation-file-household-member';
import { EvacuationFileStatus } from './evacuation-file-status';
import { EvacuationFileTask } from './evacuation-file-task';
import { FoodGroceriesSupport } from './food-groceries-support';
import { FoodRestaurantSupport } from './food-restaurant-support';
import { IncidentalsSupport } from './incidentals-support';
import { LodgingAllowanceSupport } from './lodging-allowance-support';
import { LodgingBilletingSupport } from './lodging-billeting-support';
import { LodgingGroupSupport } from './lodging-group-support';
import { LodgingHotelSupport } from './lodging-hotel-support';
import { NeedsAssessment } from './needs-assessment';
import { Note } from './note';
import { TransportationOtherSupport } from './transportation-other-support';
import { TransportationTaxiSupport } from './transportation-taxi-support';
export interface EvacuationFile {
  completedBy?: null | string;
  completedOn?: null | string;
  evacuatedFromAddress: Address;
  evacuationFileDate?: null | string;
  householdMembers?: null | Array<EvacuationFileHouseholdMember>;
  id?: null | string;
  isPaper?: null | boolean;
  isRestricted?: null | boolean;
  manualFileId?: null | string;
  needsAssessment: NeedsAssessment;
  notes?: null | Array<Note>;
  primaryRegistrantFirstName?: null | string;
  primaryRegistrantId: string;
  primaryRegistrantLastName?: null | string;
  registrationLocation: string;
  securityPhrase?: null | string;
  securityPhraseEdited?: null | boolean;
  status?: EvacuationFileStatus;
  supports?: null | Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>;
  task: EvacuationFileTask;
}
