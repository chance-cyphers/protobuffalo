import {compose, createStore} from "redux";
import rootReducer from "./reducers";
import {install} from 'redux-loop';

export default createStore(
    rootReducer,
    {},
    compose(install(), window.window.__REDUX_DEVTOOLS_EXTENSION__())
);
