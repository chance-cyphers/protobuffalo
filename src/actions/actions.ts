import {Root} from "protobufjs";

export const PROTO_LOADED = "PROTO_LOADED";
export const SERVICE_SELECTED = "SERVICE_SELECTED";
export const METHOD_SELECTED = "METHOD_SELECTED";
export const JSON_BODY_CHANGED = "JSON_BODY_CHANGED";
export const RPC_INVOKED = "RPC_INVOKED";
export const RPC_SUCCESS = "RPC_SUCCESS";
export const RPC_FAILED = "RPC_FAILED";

export type Action =
    { type: typeof PROTO_LOADED, payload: Root }
    | { type: typeof SERVICE_SELECTED, payload: string }
    | { type: typeof METHOD_SELECTED, payload: string }
    | { type: typeof JSON_BODY_CHANGED, payload: string }
    | { type: typeof RPC_INVOKED }
    | { type: typeof RPC_SUCCESS }
    | { type: typeof RPC_FAILED }

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

export function rpcSuccess(): Action {
  return {type: RPC_SUCCESS};
}

export function rpcFailed(): Action {
  return {type: RPC_FAILED};
}