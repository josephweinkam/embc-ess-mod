/* tslint:disable */
/* eslint-disable */
import { TaskWorkflow } from './task-workflow';
export interface EssTask {
  communityCode?: null | string;
  description?: null | string;
  endDate?: string;
  id?: null | string;
  startDate?: string;
  status?: null | string;
  workflows?: null | Array<TaskWorkflow>;
}
