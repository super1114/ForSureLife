import { LeadFlow } from "../actions/nav_actions";
import { isActionType } from "../utilities/action_utils";

export interface NavState {
    leadFlow: LeadFlow;
}

export const initialState: NavState = {
    leadFlow: LeadFlow.E
}

export const navReducer = (state = initialState, action) => {
    if (isActionType(action, "SET_LEAD_FLOW")) {
        return {
            ...state,
            leadFlow: action.payload
        }
    }

    return state;
}