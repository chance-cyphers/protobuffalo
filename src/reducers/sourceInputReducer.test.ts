import sourceInputReducer, {initialState, State} from "./sourceInputReducer";
import {
  jsonBodyChanged,
  methodSelected,
  protoLoaded,
  rpcFailed,
  rpcInvoked,
  rpcSuccess,
  serverAddressChanged,
  serviceSelected
} from "../actions/actions";
import {default as protobuf} from "protobufjs";
import {invokeGrpc} from "../side-effects/grpc";
import {Cmd, loop} from "redux-loop";


test('load proto', async () => {
  const root = await protobuf.load(__dirname + '/../../testdata/awesome.proto');

  const action = protoLoaded(root);

  const state = sourceInputReducer(initialState, action) as State;

  expect(state.proto).toEqual(root);
  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("AwesomeService");
  expect(state.services[0].methods.length).toBe(2);
  expect(state.services[0].methods[0].name).toBe("DoThings");
  expect(state.services[0].methods[0].requestType).toBe("AwesomeRequest");
  expect(state.services[0].methods[0].responseType).toBe("AwesomeResponse");
  expect(state.selectedService).toBe(state.services[0]);
  expect(state.selectedMethod).toBe(state.services[0].methods[0]);
});

test('load proto handles nested packages', async () => {
  const root = await protobuf.load(__dirname + '/../../testdata/not-awesome.proto');

  const action = protoLoaded(root);

  const state = sourceInputReducer(initialState, action) as State;

  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("NotAwesomeService");
});


const carlService = {
  name: "carl",
  methods: [{
    name: "chores",
    requestType: "effort",
    responseType: "cleanStuff"
  }, {
    name: "work",
    requestType: "effort",
    responseType: "money"
  }]
};

const stateWithServices: State = {
  ...initialState,
  services: [carlService, {
    name: "bob", methods: [{
      name: "louch",
      requestType: "couch",
      responseType: "you"
    }, {
      name: "drive",
      requestType: "keys",
      responseType: "co2"
    }]
  }],
  selectedService: carlService
};

test('service selected action switches selected service', () => {
  const action = serviceSelected("bob");

  const state = sourceInputReducer(stateWithServices, action) as State;

  expect(state.selectedService!.name).toBe("bob");
  expect(state.selectedService!).toBe(state.services[1]);
});

test('method selected action switched selected method', () => {
  const action = methodSelected("work");

  const state = sourceInputReducer(stateWithServices, action) as State;

  expect(state.selectedMethod!.name).toBe("work");
  expect(state.selectedMethod).toBe(stateWithServices.selectedService!.methods[1]);
});

test('json body changed, keeps track of json', () => {
  const action = jsonBodyChanged("I'm a json!");

  const state = sourceInputReducer(initialState, action) as State;

  expect(state.jsonBody).toBe("I'm a json!")
});

test('user invokes grpc, dispatches side effect', () => {
  const action = rpcInvoked();

  const result = sourceInputReducer(stateWithServices, action);

  expect(result).toEqual(loop(stateWithServices, Cmd.run(invokeGrpc, {
    successActionCreator: rpcSuccess,
    failActionCreator: rpcFailed,
    args: [
      stateWithServices.packageDefinition!,
      stateWithServices.selectedService!,
      stateWithServices.selectedMethod!,
      stateWithServices.jsonBody,
      stateWithServices.serverAddress
    ]
  })))
});

test('rpc success, sets response', () => {
  const action = rpcSuccess("hi!");

  const state = sourceInputReducer(initialState, action) as State;

  expect(state.response).toContain("hi!");
});

test('rpc failure, sets response', () => {
  const action = rpcFailed("oh noooo");

  const state = sourceInputReducer(initialState, action) as State;

  expect(state.response).toContain("oh noooo");
});

test('server address changed updates server address', () => {
  const action = serverAddressChanged("localhost or something");

  const state = sourceInputReducer(initialState, action) as State;

  expect(state.serverAddress).toBe("localhost or something");
});