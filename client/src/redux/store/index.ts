import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducer from "../reducers/index"

export const rootReducer = combineReducers({
    reducer: reducer
});

export type FiltersActionTypes =  ReturnType<typeof rootReducer>

export const store =  createStore(rootReducer, applyMiddleware(thunk));