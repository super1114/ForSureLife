import { all, fork } from "redux-saga/effects";
import { amAmSaga } from "./amam_sagas";
import { applicationSaga } from "./application_saga";

export function* rootSaga() {
    yield all([
      fork(applicationSaga),
      fork(amAmSaga)
    ]);
  }
  
  