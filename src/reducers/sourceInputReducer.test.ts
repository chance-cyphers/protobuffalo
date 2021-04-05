import sourceInputReducer, {initialState, State} from "./sourceInputReducer";
import {methodSelected, protoLoaded, serviceSelected} from "../actions/actions";
import {default as protobuf} from "protobufjs";


test('load proto', async () => {
  const root = await protobuf.load(__dirname + '/../../testdata/awesome.proto');

  const action = protoLoaded(root);

  const state = sourceInputReducer(initialState, action);

  expect(state.proto).toEqual(root);
  expect(state.services.length).toBe(1);
  expect(state.services[0].name).toBe("AwesomeService");
  expect(state.services[0].methods.length).toBe(2);
  expect(state.services[0].methods[0].name).toBe("DoThings");
  expect(state.services[0].methods[0].requestType).toBe("AwesomeRequest");
  expect(state.services[0].methods[0].responseType).toBe("AwesomeResponse");
  expect(state.selectedService).toBe(state.services[0]);
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

  const state = sourceInputReducer(stateWithServices, action);

  expect(state.selectedService!.name).toBe("bob");
  expect(state.selectedService!).toBe(state.services[1]);
});

test('method selected action switched selected method', () => {
  const action = methodSelected("work");

  const state = sourceInputReducer(stateWithServices, action);

  expect(state.selectedMethod!.name).toBe("work");
  expect(state.selectedMethod).toBe(stateWithServices.selectedService!.methods[1]);
});
