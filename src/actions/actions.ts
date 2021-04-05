import {Root} from "protobufjs";

export const PROTO_LOADED = "PROTO_LOADED";
export const SERVICE_SELECTED = "SERVICE_SELECTED";

export type Action =
    { type: typeof PROTO_LOADED, payload: Root }
    | { type: typeof SERVICE_SELECTED, payload: string }

export function protoLoaded(root: Root): Action {
  return {type: PROTO_LOADED, payload: root};
}

export function serviceSelected(name: string): Action {
  return {type: SERVICE_SELECTED, payload: name};
}