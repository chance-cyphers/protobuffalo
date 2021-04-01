import {Action, PROTO_LOADED} from "../actions/actions";

export const initialState = {
    stuff: "hello from a reducers",
    proto: null,
    services: [{
        name: "",
        methods: [{
            name: "",
            requestType: "",
            responseType: ""
        }]
    }]
};

export default function (state = initialState, action: Action) {
    if (action.type === PROTO_LOADED) {
        // const packages = Object.entries(action.payload.nested)
        //     .map((k, v) => {
        //         return k
        //     });

        return {
            ...state,
            proto: state.proto,
            services: []
        };
    }


    return state;
}