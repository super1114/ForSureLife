
import { Action } from 'redux-actions';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { ErrorSaveApplication, FinishSaveApplication, SavePayload } from '../actions/application_actions';
import { httpWithTokenInHeader } from '../clients/api.clients.base';
import { ApplicationClient, ApplicationDto } from '../clients/api.generated.clients';
import { navigate } from '../utilities/navigation_util';

export function* handleStartSaveApplication(action: Action<SavePayload>) {
    try {
        try {
            const response: ApplicationDto | Error = yield call(saveApplication, action.payload.app);

            if ((response as Error).message && (response as Error).stack) {
                throw 'Error calling save application'
            } else {
                yield put(FinishSaveApplication(response as ApplicationDto));
                if (action.payload.path !== "") {
                    navigate(action.payload.history, action.payload.path);
                }         
            }
        }
        catch (e) {
            yield put(ErrorSaveApplication());
        }

    } catch (e) {
        yield put(ErrorSaveApplication());
    }
}

export function saveApplication(app: ApplicationDto): Promise<void | ApplicationDto> {
    const client = new ApplicationClient(process.env.REACT_APP_API_URL, httpWithTokenInHeader);
    return client.update(app).then(response => {
        console.log('response', response);
        return response;
    }).catch(ex => {
        return ex;
    });
}

export function* applicationSaga() {
    yield takeEvery("START_SAVE_APPLICATION", handleStartSaveApplication);
}