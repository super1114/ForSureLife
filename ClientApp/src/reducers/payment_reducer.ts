import { isActionType } from "../utilities/action_utils";
import { EmptyObjects } from "../utilities/empty_objects";

export const initialState = EmptyObjects.EmptyApplication;

export const paymentReducer = (state = initialState, action) => {
    if (isActionType(action, 'INITIALIZE_PAYMENT')) {
        return action.payload;
    }


    if (isActionType(action, 'UPDATE_PAYMENT')) {
        return {
            ...state,
            paymentInfo: { ...action.payload }
        }
    }

    if (isActionType(action, "FINISH_SAVE_APPLICATION")) {
        return action.payload;
    };

    return state;
}