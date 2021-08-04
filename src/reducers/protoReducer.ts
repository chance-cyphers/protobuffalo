import {
  Action,
  GENERAL_ERROR,
  generalError,
  JSON_BODY_CHANGED,
  LOAD_PROTO_CLICKED,
  METHOD_SELECTED,
  PACKAGE_DEFINITION_LOADED,
  packageDefinitionLoaded,
  PROTO_FILE_PICKED,
  PROTO_LOADED,
  protoFilePicked,
  protoLoaded,
  RPC_FAILED,
  RPC_INVOKED,
  RPC_SUCCESS,
  rpcFailed,
  rpcSuccess,
  SERVER_ADDRESS_CHANGED,
  SERVICE_SELECTED, TAB_CLICKED
} from "../actions/actions";
import {Method, Namespace, ReflectionObject, Root, Service} from "protobufjs";
import {Cmd, loop, Loop} from "redux-loop";
import {invokeGrpc, loadProto_protobufjs, loadProto_protoLoader} from "../side-effects/grpc";
import {showFileDialog} from "../side-effects/loadFile";
import {PackageDefinition} from "@grpc/proto-loader";

export const initialState = {
  proto: undefined,
  services: Array<Service>(),
  selectedService: undefined,
  selectedMethod: undefined,
  jsonBody: '{\n  "awesome_field": "sahhh",\n  "just_an_average_string": "adsgf"\n}',
  response: undefined,
  protoPath: undefined,
  packageDefinition: undefined,
  serverAddress: "localhost:50051",
  currentTab: "three"
};

export interface State {
  proto?: Root
  services: Service[]
  selectedService?: Service
  selectedMethod?: Method
  jsonBody: string
  response?: string
  protoPath?: string
  packageDefinition?: PackageDefinition,
  serverAddress: string,
  currentTab: string
}

export default function (state: State = initialState, action: Action): State | Loop<State> {

  if (action.type === SERVER_ADDRESS_CHANGED) {
    return {...state, serverAddress: action.payload};
  }

  if (action.type === LOAD_PROTO_CLICKED) {
    return loop(state, Cmd.run(showFileDialog, {
      successActionCreator: protoFilePicked,
      failActionCreator: generalError,
      args: []
    }));
  }

  if (action.type === PROTO_FILE_PICKED) {
    const loadProtoAction = Cmd.run(loadProto_protobufjs, {
      successActionCreator: protoLoaded,
      failActionCreator: generalError,
      args: [action.payload]
    });

    const loadPackageDefAction = Cmd.run(loadProto_protoLoader, {
      successActionCreator: packageDefinitionLoaded,
      failActionCreator: generalError,
      args: [action.payload]
    });

    return loop({...state, protoPath: action.payload}, Cmd.list([loadProtoAction, loadPackageDefAction]));
  }

  if (action.type === PACKAGE_DEFINITION_LOADED) {
    return {...state, packageDefinition: action.payload};
  }

  if (action.type === GENERAL_ERROR) {
    return {...state, response: action.payload};
  }

  if (action.type === RPC_INVOKED) {
    return loop({...state, currentTab: 'four'}, Cmd.run(invokeGrpc, {
      successActionCreator: rpcSuccess,
      failActionCreator: rpcFailed,
      args: [
        state.packageDefinition!,
        state.selectedService!,
        state.selectedMethod!,
        state.jsonBody,
        state.serverAddress
      ]
    }));
  }

  if (action.type === RPC_SUCCESS) {
    return {...state, response: JSON.stringify(action.payload)};
  }

  if (action.type === RPC_FAILED) {
    return {...state, response: JSON.stringify(action.payload)};
  }

  if (action.type === SERVICE_SELECTED) {
    const selectedService = state.services.find(s => s.name === action.payload);
    return {...state, selectedService: selectedService};
  }

  if (action.type === METHOD_SELECTED) {
    const selectedMethod = state.selectedService!.methodsArray.find(m => m.name === action.payload);
    return {...state, selectedMethod: selectedMethod};
  }

  if (action.type === JSON_BODY_CHANGED) {
    return {...state, jsonBody: action.payload};
  }

  if (action.type === PROTO_LOADED) {
    const services = getServices(action.payload);

    return {
      ...state,
      proto: action.payload,
      services: services,
      selectedService: services[0],
      selectedMethod: services[0].methodsArray[0]
    };
  }

  if (action.type === TAB_CLICKED) {
    return {...state, currentTab: action.payload};
  }

  return state;
}

function getServices(current: ReflectionObject): Service[] {
  if (current instanceof Service) {
    return [current];
  }

  if (current instanceof Namespace) {
    return current.nestedArray.flatMap(getServices);
  }

  return [];
}