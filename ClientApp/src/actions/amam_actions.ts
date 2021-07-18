import { createAction } from "redux-actions";
import { AAFinalExpense } from "../clients/api.generated.clients";
import { History } from 'history';

export interface SaveAmAmPayload {
    aa: AAFinalExpense;
    path: string;
    history: History;
}

export const StartSaveAmAmApplication = createAction<SaveAmAmPayload>("START_SAVE_AMAM_APPLICATION");
export const FinishSaveAmAmApplication = createAction<AAFinalExpense>("FINISH_SAVE_AMAM_APPLICATION");
export const ErrorSaveAmAmApplication = createAction("ERROR_SAVING_AMAM_APPLICATION");


export const InitializeAmAmApplication = createAction<AAFinalExpense>("INITIALIZE_AMAM_APPLICATION");

