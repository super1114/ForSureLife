import { combineReducers } from 'redux';
import { applicationInfoReducer } from './application_info_reducer';
import { layoutReducer, LayoutState } from './layout_reducer';
import { navReducer, NavState } from './nav_reducer';
import { AAFinalExpense, ApplicationDto, QuoteDto } from '../clients/api.generated.clients';
import { quoteReducer } from './quote_reducer';
import { amAmReducer } from './amam_reducer';

export interface GlobalState {
    app: ApplicationDto;
    quote: QuoteDto;
    layout: LayoutState;
    navigation: NavState;
    aaFinalExpense: AAFinalExpense;
}

export const rootReducer = combineReducers({
    layout: layoutReducer,
    navigation: navReducer,
    app: applicationInfoReducer,
    quote: quoteReducer,
    aaFinalExpense: amAmReducer
});

const emptyAction = { type: '' };
export const reduxInitialState = rootReducer(undefined, emptyAction);