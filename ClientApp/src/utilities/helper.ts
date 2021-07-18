import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from "redux";

export function customBindActionCreators<
    A,
    M extends ActionCreatorsMapObject<A>
>(actionCreators: M, dispatch: Dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}
