import { createAction } from 'redux-actions';
import { ApplicationDto, ApplicationHealthQuestions, ApplicationInfoDto, BeneficiaryDto, LeadHealthQuestions, Occurence, PaymentInfoDto } from '../clients/api.generated.clients';
import { History } from 'history';

export interface UpdateHealthQuestionAnswerPayload {
    applicationQuestion: ApplicationHealthQuestions;
    healthAnswer: boolean;
}

export interface UpdateHealthQuestionOccurencePayload {
    applicationQuestion: ApplicationHealthQuestions;
    occurence: Occurence;
}

export interface UpdateKnockoutQuestionAnswerPayload {
    leadHealthQuestion: LeadHealthQuestions;
    healthAnswer: boolean;
}

export interface UpdateKnockoutQuestionOccurencePayload {
    leadHealthQuestion: LeadHealthQuestions;
    occurence: Occurence;
}

export interface SavePayload {
    app: ApplicationDto;
    path: string;
    history: History;
}

export const StartSaveApplication = createAction<SavePayload>("START_SAVE_APPLICATION");
export const FinishSaveApplication = createAction<ApplicationDto>("FINISH_SAVE_APPLICATION");
export const ErrorSaveApplication = createAction("ERROR_SAVING_APPLICATION");

export const InitializeApplication = createAction<ApplicationDto>("INITIALIZE_APPLICATION");
export const UpdateApplicationInfo = createAction<ApplicationInfoDto>("UPDATE_APPLICATION_INFO");

export const UpdateHealthQuestionAnswer = createAction<UpdateHealthQuestionAnswerPayload>("UPDATE_HEALTH_QUESTION_ANSWER");
export const UpdateHealthQuestionOccurence = createAction<UpdateHealthQuestionOccurencePayload>("UPDATE_HEALTH_QUESTION_OCCURENCE");

export const UpdateKnockoutQuestionAnswer = createAction<UpdateKnockoutQuestionAnswerPayload>("UPDATE_KNOCKOUT_QUESTION_ANSWER");
export const UpdateKnockoutQuestionOccurence = createAction<UpdateKnockoutQuestionOccurencePayload>("UPDATE_KNOCKOUT_QUESTION_OCCURENCE");

export const UpdateBeneficiary = createAction<BeneficiaryDto>("UPDATE_BENEFICIARY_DTO");
export const AddBeneficiary = createAction<BeneficiaryDto>("ADD_BENEFICIARY");
export const UpdatePaymentInfo = createAction<PaymentInfoDto>("UPDATE_PAYMENT_INFO");
