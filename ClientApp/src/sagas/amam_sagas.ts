
import { Action } from 'redux-actions';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ErrorSaveAmAmApplication, FinishSaveAmAmApplication, SaveAmAmPayload } from '../actions/amam_actions';
import { httpWithTokenInHeader } from '../clients/api.clients.base';
import { AAFinalExpense, ApplicationClient, ApplicationDto, QuoteClient } from '../clients/api.generated.clients';
import { navigate } from '../utilities/navigation_util';

export function* handleStartSaveAmAmApplication(action: Action<SaveAmAmPayload>) {
    try {
        try {
            const response: AAFinalExpense | Error = yield call(saveAmAmApplication, action.payload.aa);

            if ((response as Error).message && (response as Error).stack) {
                throw 'Error calling save application'
            } else {
                yield put(FinishSaveAmAmApplication(response as AAFinalExpense));
                navigate(action.payload.history, action.payload.path);
            }
        }
        catch (e) {
            yield put(ErrorSaveAmAmApplication());
        }

    } catch (e) {
        yield put(ErrorSaveAmAmApplication());
    }
}

export function saveAmAmApplication(aaFinalExpense: AAFinalExpense): Promise<void | AAFinalExpense> {
    const client = new QuoteClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
    return client.updateAmAmApplication(aaFinalExpense).then(response => {
        return response;
    }).catch(ex => {
        return ex;
    });
}

export function* amAmSaga() {
    yield takeEvery("START_SAVE_AMAM_APPLICATION", handleStartSaveAmAmApplication);
}