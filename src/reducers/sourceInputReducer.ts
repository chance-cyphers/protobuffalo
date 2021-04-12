import {
  Action, GENERAL_ERROR, generalError,
  JSON_BODY_CHANGED, LOAD_PROTO_CLICKED,
  METHOD_SELECTED, PACKAGE_DEFINITION_LOADED, packageDefinitionLoaded, PROTO_FILE_PICKED,
  PROTO_LOADED, protoFilePicked, protoLoaded,
  RPC_FAILED,
  RPC_INVOKED,
  RPC_SUCCESS,
  rpcFailed,
  rpcSuccess, SERVER_ADDRESS_CHANGED,
  SERVICE_SELECTED
} from "../actions/actions";
import {NamespaceBase, Root} from "protobufjs";
import {Cmd, loop, Loop} from "redux-loop";
import {loadProto_protoLoader, invokeGrpc, loadProto_protobufjs} from "../side-effects/grpc";
import {showFileDialog} from "../side-effects/loadFile";
import {PackageDefinition} from "@grpc/proto-loader";

export const initialState = {
  stuff: "hello from a reducers",
  proto: undefined,
  services: Array<Service>(),
  selectedService: undefined,
  selectedMethod: undefined,
  jsonBody: '{"awesome_field": "sahhh", "just_an_average_string": "adsgf"}',
  response: undefined,
  protoPath: undefined,
  packageDefinition: undefined,
  serverAddress: "localhost:50051"
};

export interface State {
  stuff: string
  proto?: Root
  services: Service[]
  selectedService?: Service
  selectedMethod?: Method
  jsonBody: string
  response?: string
  protoPath?: string
  packageDefinition?: PackageDefinition,
  serverAddress: string
}

export interface Service {
  name: string
  methods: Method[]
}

export interface Method {
  name: string
  requestType: string
  responseType: string
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
    return loop(state, Cmd.run(invokeGrpc, {
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
    const selectedMethod = state.selectedService!.methods.find(m => m.name === action.payload);
    return {...state, selectedMethod: selectedMethod};
  }

  if (action.type === JSON_BODY_CHANGED) {
    return {...state, jsonBody: action.payload};
  }

  if (action.type === PROTO_LOADED) {
    const firstPackage = action.payload.nestedArray[0] as NamespaceBase;

    const serviceNames = Object.getOwnPropertyNames(firstPackage.nested).filter(item => {
      try {
        firstPackage.lookupService(item);
        return true
      } catch (e) {
        return false;
      }
    });

    const services = serviceNames.map(serviceName => {
      const service = firstPackage.lookupService(serviceName);

      return {
        name: serviceName,
        methods: [...service.methodsArray]
      };
    });

    return {
      ...state,
      proto: action.payload,
      services: services,
      selectedService: services[0],
      selectedMethod: services[0].methods[0]
    };
  }

  return state;
}