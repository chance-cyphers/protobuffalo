import protoReducer, {initialState, State} from "./protoReducer";
import {
  jsonBodyChanged,
  methodSelected,
  protoLoaded,
  rpcFailed,
  rpcInvoked,
  rpcSuccess, saveInvoked,
  serverAddressChanged,
  serviceSelected, tabClicked
} from "../actions/actions";
import {default as protobuf, Method, Service} from "protobufjs";
import {invokeGrpc} from "../side-effects/grpc";
import {Cmd, Loop} from "redux-loop";
import {saveFile} from "../side-effects/saveFile";


test('load proto', async () => {
  const root = await protobuf.load(__dirname + '/../../testdata/awesome.proto');

  const action = protoLoaded(root);

  const state = protoReducer(initialState, action) as State;

  expect(state.proto).toEqual(root);
  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("AwesomeService");
  expect(state.services[0].methodsArray.length).toBe(2);
  expect(state.services[0].methodsArray[0].name).toBe("DoThings");
  expect(state.services[0].methodsArray[0].requestType).toBe("AwesomeRequest");
  expect(state.services[0].methodsArray[0].responseType).toBe("AwesomeResponse");
  expect(state.selectedService).toBe(state.services[0]);
  expect(state.selectedMethod).toBe(state.services[0].methodsArray[0]);
});

test('load proto handles nested packages', async () => {
  const root = await protobuf.load(__dirname + '/../../testdata/not-awesome.proto');

  const action = protoLoaded(root);

  const state = protoReducer(initialState, action) as State;

  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("NotAwesomeService");
});


const carlService = new Service("carl")
    .add(new Method("chores", "", "effort", "cleanStuff"))
    .add(new Method("work", "", "effort", "money")) as Service;

const stateWithServices: State = {
  ...initialState,
  services: [
    carlService,
    new Service("bob")
        .add(new Method("louch", "", "couch", "you"))
        .add(new Method("drive", "", "keys", "co2")) as Service
  ],
  selectedService: carlService
};

test('service selected action switches selected service', () => {
  const action = serviceSelected("bob");

  const state = protoReducer(stateWithServices, action) as State;

  expect(state.selectedService!.name).toBe("bob");
  expect(state.selectedService!).toBe(state.services[1]);
});

test('method selected action switched selected method', () => {
  const action = methodSelected("work");

  const state = protoReducer(stateWithServices, action) as State;

  expect(state.selectedMethod!.name).toBe("work");
  expect(state.selectedMethod).toBe(stateWithServices.selectedService!.methodsArray[1]);
});

test('json body changed, keeps track of json', () => {
  const action = jsonBodyChanged("I'm a json!");

  const state = protoReducer(initialState, action) as State;

  expect(state.jsonBody).toBe("I'm a json!")
});

test('user invokes grpc, dispatches side effect', () => {
  const action = rpcInvoked();

  const result = protoReducer(stateWithServices, action) as Loop<State>;

  expect(result[1]).toEqual(Cmd.run(invokeGrpc, {
    successActionCreator: rpcSuccess,
    failActionCreator: rpcFailed,
    args: [
      stateWithServices.packageDefinition!,
      stateWithServices.selectedService!,
      stateWithServices.selectedMethod!,
      stateWithServices.jsonBody,
      stateWithServices.serverAddress
    ]
  }))
});

test('rpc success, sets response', () => {
  const action = rpcSuccess("hi!");

  const state = protoReducer(initialState, action) as State;

  expect(state.response).toContain("hi!");
});

test('rpc failure, sets response', () => {
  const action = rpcFailed("oh noooo");

  const state = protoReducer(initialState, action) as State;

  expect(state.response).toContain("oh noooo");
});

test('server address changed updates server address', () => {
  const action = serverAddressChanged("localhost or something");

  const state = protoReducer(initialState, action) as State;

  expect(state.serverAddress).toBe("localhost or something");
});

test('user invokes grpc, switches to response tab', () => {
  const action = rpcInvoked();

  const loop = protoReducer(initialState, action) as Loop<State>;

  expect(loop[0].currentTab).toBe('four');
});

test('tab clicked, changes tab', () => {
  const action = tabClicked('four');

  const state = protoReducer(initialState, action) as State;

  expect(state.currentTab).toBe('four');
});

test('saves file when user invokes save', () => {
  const action = saveInvoked();

  const loop = protoReducer(initialState, action) as Loop<State>;

  expect(loop[0]).toEqual(initialState);
  expect(loop[1]).toEqual(Cmd.run(saveFile, {
    args: [
        initialState
    ]
  }));
});