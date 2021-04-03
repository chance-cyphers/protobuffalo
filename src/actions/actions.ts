import {Root} from "protobufjs";

export const PROTO_LOADED = "PROTO_LOADED";

export type Action = { type: typeof PROTO_LOADED, payload: Root }

export function protoLoaded(root: Root): Action {
    return {type: PROTO_LOADED, payload: root};
}