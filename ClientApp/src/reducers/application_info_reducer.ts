import { UpdateApplicationInfo } from "../actions/application_actions";
import { isActionType } from "../utilities/action_utils";
import { EmptyObjects } from "../utilities/empty_objects";
import { GlobalState } from "./root_reducer";

export const initialState = EmptyObjects.EmptyApplication;

export const applicationInfoReducer = (state = initialState, action) => {

    if (isActionType(action, "UPDATE_LEAD")) {
        return {
            ...state,
            leadInfo: {
                ...state.leadInfo,
                ...action.payload
            }
        }
    }

    if (isActionType(action, 'INITIALIZE_APPLICATION')) {
        return action.payload;
    }

    if (isActionType(action, 'UPDATE_COVERAGE_AND_RATE')) {
        return {
            ...state,
            leadInfo: {
                ...state.leadInfo,
                desiredCoverageAmount: action.payload.selectedBenefitAmount
            }
        }
    }


    if (isActionType(action, 'UPDATE_HEALTH_QUESTION_ANSWER')) {
        const healthQuestions = [...state.healthQuestions].map(hq => {
            if (hq.applicationQuestion === action.payload.applicationQuestion) {
                hq.healthAnswer = action.payload.healthAnswer;
            }
            return hq;
        });
        return {
            ...state,
            healthQuestions
        }
    }

    if (isActionType(action, 'UPDATE_HEALTH_QUESTION_OCCURENCE')) {
        const healthQuestions = [...state.healthQuestions].map(hq => {
            if (hq.applicationQuestion === action.payload.applicationQuestion) {
                hq.occurence = action.payload.occurence;
            }
            return hq;
        });
        return {
            ...state,
            healthQuestions
        }
    }

    if (isActionType(action, 'UPDATE_KNOCKOUT_QUESTION_ANSWER')) {
        const healthQuestions = [...state.leadInfo.healthQuestions].map(hq => {
            if (hq.leadHealthQuestion === action.payload.leadHealthQuestion) {
                hq.healthAnswer = action.payload.healthAnswer;
            }
            return hq;
        });
        return {
            ...state,
            leadInfo: {
                ...state.leadInfo,
                healthQuestions
            }
        }
    }

    if (isActionType(action, 'UPDATE_KNOCKOUT_QUESTION_OCCURENCE')) {
        const healthQuestions = [...state.leadInfo.healthQuestions].map(hq => {
            if (hq.leadHealthQuestion === action.payload.leadHealthQuestion) {
                hq.occurence = action.payload.occurence;
            }
            return hq;
        });
        return {
            ...state,
            leadInfo: {
                ...state.leadInfo,
                healthQuestions
            }
        }
    }

    if (isActionType(action, 'UPDATE_APPLICATION_INFO')) {
        return {
            ...state,
            applicationInfo: { ...action.payload }
        }
    };

    if (isActionType(action, 'UPDATE_BENEFICIARIES')) {
        return {
            ...state,
            beneficiaries: action.payload
        }
    };

    if (isActionType(action, 'UPDATE_CONTINGENT_BENEFICIARIES')) {
        return {
            ...state,
            contingentBeneficiaries: action.payload
        }
    };


    if (isActionType(action, "FINISH_SAVE_APPLICATION")) {
        return action.payload;
    };

    if (isActionType(action, "UPDATE_PAYMENT_INFO")) {
        return {
            ...state,
            paymentInfo: action.payload
        }
    }

    return state;
}