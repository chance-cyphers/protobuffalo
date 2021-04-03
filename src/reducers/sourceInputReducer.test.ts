import sourceInputReducer, {initialState} from "./sourceInputReducer";
import {protoLoaded} from "../actions/actions";
import {default as protobuf, Root} from "protobufjs";


test('load proto', async () => {
  const root = await protobuf.load(__dirname + '/../../devtools/awesome.proto')

  const action = protoLoaded(root);

  const state = sourceInputReducer(initialState, action);

  console.log(`service: ${JSON.stringify(state.services[0].methods[0].name)}`)

  expect(state.proto).toEqual(root);
  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("AwesomeService");
  expect(state.services[0].methods.length).toBe(2);
  expect(state.services[0].methods[0].name).toBe("DoThings");
  expect(state.services[0].methods[0].requestType).toBe("AwesomeRequest");
  expect(state.services[0].methods[0].responseType).toBe("AwesomeResponse");
});