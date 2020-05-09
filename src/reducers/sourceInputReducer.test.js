import sourceInputReducer, {initialState} from "./sourceInputReducer";
import {protoLoaded} from "../actions/actions";


test('sets initial state', () => {
    const state = sourceInputReducer();

    expect(state.stuff).toEqual("hello from a reducers");
    expect(state.proto).toEqual(null);
});

test('load proto', () => {
    const proto = {
        "awesomepackage": {
            "nested": {
                "AwesomeMessage": {
                    "fields": {
                        "awesomeField": {
                            "type": "string",
                            "id": 1
                        }
                    }
                }
            }
        }
    };
    const action = protoLoaded(proto);

    const state = sourceInputReducer(initialState, action);

    expect(state.proto).toEqual(proto);
});