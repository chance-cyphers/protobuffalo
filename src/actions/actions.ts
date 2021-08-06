import {Root} from "protobufjs";
import {PackageDefinition} from "@grpc/proto-loader";

export const PROTO_LOADED = "PROTO_LOADED";
export const SERVICE_SELECTED = "SERVICE_SELECTED";
export const METHOD_SELECTED = "METHOD_SELECTED";
export const JSON_BODY_CHANGED = "JSON_BODY_CHANGED";
export const RPC_INVOKED = "RPC_INVOKED";
export const RPC_SUCCESS = "RPC_SUCCESS";
export const RPC_FAILED = "RPC_FAILED";
export const LOAD_PROTO_CLICKED = "LOAD_PROTO_CLICKED";
export const PROTO_FILE_PICKED = "PROTO_FILE_PICKED";
export const GENERAL_ERROR = "GENERAL_ERROR";
export const PACKAGE_DEFINITION_LOADED = "PACKAGE_DEFINITION_LOADED";
export const SERVER_ADDRESS_CHANGED = "SERVER_ADDRESS_CHANGED";
export const TAB_CLICKED = "TAB_CLICKED";
export const SAVE_INVOKED = "SAVE_INVOKED";

export type Action =
    { type: typeof PROTO_LOADED, payload: Root }
    | { type: typeof SERVICE_SELECTED, payload: string }
    | { type: typeof METHOD_SELECTED, payload: string }
    | { type: typeof JSON_BODY_CHANGED, payload: string }
    | { type: typeof RPC_INVOKED }
    | { type: typeof RPC_SUCCESS, payload: any }
    | { type: typeof RPC_FAILED, payload: any }
    | { type: typeof LOAD_PROTO_CLICKED }
    | { type: typeof PROTO_FILE_PICKED, payload: string }
    | { type: typeof GENERAL_ERROR, payload: any }
    | { type: typeof PACKAGE_DEFINITION_LOADED, payload: PackageDefinition }
    | { type: typeof SERVER_ADDRESS_CHANGED, payload: string }
    | { type: typeof TAB_CLICKED, payload: string }
    | { type: typeof SAVE_INVOKED }

export function protoLoaded(root: Root): Action {
  return {type: PROTO_LOADED, payload: root};
}

export function serviceSelected(name: string): Action {
  return {type: SERVICE_SELECTED, payload: name};
}

export function methodSelected(name: string): Action {
  return {type: METHOD_SELECTED, payload: name};
}

export function jsonBodyChanged(json: string): Action {
  return {type: JSON_BODY_CHANGED, payload: json};
}

export function rpcInvoked(): Action {
  return {type: RPC_INVOKED};
}

export function rpcSuccess(response: any): Action {
  return {type: RPC_SUCCESS, payload: response};
}

export function rpcFailed(err: any): Action {
  return {type: RPC_FAILED, payload: err};
}

export function loadProtoClicked(): Action {
  return {type: LOAD_PROTO_CLICKED}
}

export function protoFilePicked(filepath: string): Action {
  return {type: PROTO_FILE_PICKED, payload: filepath};
}

export function generalError(error: any): Action {
  return {type: GENERAL_ERROR, payload: error};
}

export function packageDefinitionLoaded(packageDef: PackageDefinition): Action {
  return {type: PACKAGE_DEFINITION_LOADED, payload: packageDef};
}

export function serverAddressChanged(value: string): Action {
  return {type: SERVER_ADDRESS_CHANGED, payload: value};
}

export function tabClicked(value: string): Action {
  return {type: TAB_CLICKED, payload: value};
}

export function saveInvoked(): Action {
  return {type: SAVE_INVOKED};
}