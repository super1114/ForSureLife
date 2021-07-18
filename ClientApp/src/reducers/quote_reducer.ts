import { UpdateStepper } from "../actions/nav_actions";
import { Quote, QuoteDto } from "../clients/api.generated.clients";
import { isActionType } from "../utilities/action_utils";
import { EmptyObjects } from "../utilities/empty_objects";

export const initialState: QuoteDto = {
    ...EmptyObjects.EmptyQuoteState,

    age: 0,
    selectedMonthlyRate: 0,
    selectedBenefitAmount: 0,
    city: "Little Elm",
    address1: "2613 Elk Horn Dr",
    address2: "",
    zipCode: "75068",
    state: "Tx"

}

export const quoteReducer = (state: QuoteDto = initialState, action) => {

    if (isActionType(action, 'STORE_QUOTE')) {
        return {
            ...state,
            ...action.payload
        }
    }

    if (isActionType(action, 'UPDATE_COVERAGE_AND_RATE')) {

        const rates = state.rates.map((r, i) => {
            if (i === action.payload.selectedIndex) {
                r.selectedCoverage = true;
            }
            return r;
        });
        return {
            ...state,
            rates,
            selectedMonthlyRate: action.payload.selectedMonthlyRate,
            selectedBenefitAmount: action.payload.selectedBenefitAmount,
        } as QuoteDto
    }

    return state;
}