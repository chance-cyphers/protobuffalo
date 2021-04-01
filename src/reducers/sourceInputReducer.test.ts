import sourceInputReducer, {initialState} from "./sourceInputReducer";
import {protoLoaded} from "../actions/actions";


test('sets initial state', () => {
  const state = sourceInputReducer(initialState, protoLoaded(""));

  expect(state.stuff).toEqual("hello from a reducers");
  expect(state.proto).toEqual(null);
  expect(state.services.length).toBe(0)
});

test('load proto', () => {
  const proto = {
    nested: {
      awesomepackage: {
        nested: {
          AwesomeRequest: {
            fields: {
              awesomeField: {
                type: 'string',
                id: 1
              },
              justAnAverageString: {
                type: 'string',
                id: 2
              }
            }
          },
          AwesomeResponse: {
            fields: {
              answerToStuff: {
                type: 'string',
                id: 1
              }
            }
          },
          AwesomeService: {
            methods: {
              DoThings: {
                requestType: 'AwesomeRequest',
                responseType: 'AwesomeResponse'
              },
              DoMoreThings: {
                requestType: 'AwesomeRequest',
                responseType: 'AwesomeResponse',
                responseStream: true
              }
            }
          }
        }
      }
    }
  };

  const action = protoLoaded(proto);

  const state = sourceInputReducer(initialState, action);

  expect(state.proto).toEqual(proto);
  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("AwesomeService");
});