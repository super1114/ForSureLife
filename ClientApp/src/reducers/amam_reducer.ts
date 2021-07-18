import { AAFinalExpense, AmAmApplicationAnswers } from "../clients/api.generated.clients";
import { isActionType } from "../utilities/action_utils";
import { EmptyObjects } from "../utilities/empty_objects";

export const initialState = EmptyObjects.EmptyAAFinalExpense;

export const amAmReducer = (state = initialState, action) => {

    if (isActionType(action, "INITIALIZE_AMAM_APPLICATION")) {
        const aaFinalExpense: AAFinalExpense = action.payload;
        aaFinalExpense.applicationAnswers.sort((a: AmAmApplicationAnswers, b: AmAmApplicationAnswers) => {
            if (a.question.questionName > b.question.questionName) {
                return 1;
            } else {
                return -1;
            }

        })
        return aaFinalExpense;
    }

    if (isActionType(action, "FINISH_SAVE_AMAM_APPLICATION")) {
        return action.payload
    }

    if (isActionType(action, "START_SAVE_AMAM_APPLICATION")) {
        return {
            ...state
        }
    }
    return state;
}