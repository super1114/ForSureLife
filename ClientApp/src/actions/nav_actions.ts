import { createAction } from 'redux-actions';

export enum LeadFlow {
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5
}

export const UpdateStepper = createAction("UPDATE_STEPPER");
export const SetLeadFlow = createAction<LeadFlow>("SET_LEAD_FLOW");