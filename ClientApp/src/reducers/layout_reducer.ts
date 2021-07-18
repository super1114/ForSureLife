import { UpdateDimensions } from "../actions/layout_actions";
import { isActionType } from "../utilities/action_utils";

export interface LayoutState {
    width: number;
    height: number;
    loading: boolean;
}
export const initialState = {
    width: window.innerWidth,
    height: window.innerHeight,
    loading: false
}

export function layoutReducer(state = initialState, action) {

    if (isActionType(action, UpdateDimensions().type)) {
        console.log(action);
        return {
            ...state,
            width: action.payload.width,
            height: action.payload.height,
            loading: false
        }
    };

    if (isActionType(action, "START_SAVE_APPLICATION")) {
        return {
            ...state,
            loading: true
        }
    }

    if (isActionType(action, "FINISH_SAVE_APPLICATION")) {
        return {
            ...state,
            loading: false
        }
    }

    if (isActionType(action, "ERROR_SAVING_APPLICATION")) {
        return {
            ...state,
            loading: false
        }
    }


    return state;
}