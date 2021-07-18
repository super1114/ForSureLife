import type { Store, AnyAction } from 'redux';
import { GlobalState } from '../../reducers/root_reducer';
import { FslStore } from '../../utilities/redux_store';

type A = AnyAction;
type S = GlobalState;
export abstract class StoreService {
    private static _store: FslStore | undefined;
    private static _persistor;

    static initialize(store: FslStore, persistor) {
        if (StoreService._store !== undefined) {
            console.warn('StoreService is being initialized for a second time');
        }
        StoreService._store = store;
        StoreService._persistor = persistor;
    }

    /**
     * Should only be used to give the store prop to the Provider component
     */
    static getStore() {
        if (StoreService._store === undefined) {
            throw new Error(
                'Must initialize the StoreService before accessing the store'
            );
        }
        return StoreService._store;
    }

    static getPersistor() {
        if (StoreService._persistor === undefined) {
            throw new Error(
                'Must initialize the StoreService before accessing the persistor'
            );
        }
        return StoreService._persistor;
    }

    static getState() {
        return StoreService.getStore().getState();
    }

    static dispatch<T extends A>(action: T): T {
        return StoreService.getStore().dispatch(action);
    }
}
