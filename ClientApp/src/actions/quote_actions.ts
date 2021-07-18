import { createAction } from "redux-actions"
import { QuoteDto } from "../clients/api.generated.clients"


export const StoreQuote = createAction<QuoteDto>("STORE_QUOTE");

export const UpdateSelectedCoverageAndRate = createAction<{ selectedBenefitAmount: number, selectedMonthlyRate: number, selectedIndex: number }>('UPDATE_COVERAGE_AND_RATE');