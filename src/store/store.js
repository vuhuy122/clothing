import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger"
import { rootReducer } from "./root-reducer";

const loggerMiddleware = (store) => (next) => (action) => {

    if (!action.type) {
        return next(action);
    }
    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentStore: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
}


//root reducer
const middleware = [loggerMiddleware]

const composeEnhances = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducer, undefined, composeEnhances)