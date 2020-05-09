import {PROTO_LOADED} from "../actions/actions";

export const initialState = {
    stuff: "hello from a reducers",
    proto: null
};

export default function (state = initialState, action = {}) {
    if (action.type === PROTO_LOADED) {
        return { ...state, proto: action.payload };
    }

    return state;
}