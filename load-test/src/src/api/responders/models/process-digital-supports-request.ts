/* tslint:disable */
/* eslint-disable */
import { ClothingSupport } from './clothing-support';
import { FoodGroceriesSupport } from './food-groceries-support';
import { FoodRestaurantSupport } from './food-restaurant-support';
import { IncidentalsSupport } from './incidentals-support';
import { LodgingAllowanceSupport } from './lodging-allowance-support';
import { LodgingBilletingSupport } from './lodging-billeting-support';
import { LodgingGroupSupport } from './lodging-group-support';
import { LodgingHotelSupport } from './lodging-hotel-support';
import { TransportationOtherSupport } from './transportation-other-support';
import { TransportationTaxiSupport } from './transportation-taxi-support';
export interface ProcessDigitalSupportsRequest {
  includeSummaryInPrintRequest?: boolean;
  supports?: null | Array<(ClothingSupport | IncidentalsSupport | FoodGroceriesSupport | FoodRestaurantSupport | LodgingHotelSupport | LodgingBilletingSupport | LodgingGroupSupport | LodgingAllowanceSupport | TransportationTaxiSupport | TransportationOtherSupport)>;
}
