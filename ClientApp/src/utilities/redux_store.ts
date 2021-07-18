import { GlobalState, rootReducer } from '../reducers/root_reducer';
import sagaMiddlewareFactory from "redux-saga";
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import { rootSaga } from '../sagas/rootSaga';
import type { Store, AnyAction } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
 
const sagaMiddleware = sagaMiddlewareFactory();
const logger = createLogger();
const enhancer = composeWithDevTools(
    applyMiddleware(sagaMiddleware, logger),
    persistState(
        window.location.href.match(
            /[?&]debug_session=([^&#]+)\b/
        ) as any
    )
);

const persistConfig = {
    key: 'root',
    storage,
  }

export function configureStore(initialState) {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    const store = createStore(persistedReducer, initialState, enhancer);
    let persistor = persistStore(store)
    sagaMiddleware.run(rootSaga);

    return { store, persistor };
}

type A = AnyAction;
type S = GlobalState;
export type FslStore = Store<S, A>;
