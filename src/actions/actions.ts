export const PROTO_LOADED = "PROTO_LOADED";

export type Action = { type: typeof PROTO_LOADED, payload: any }

export function protoLoaded(root: any): Action {
    return {type: PROTO_LOADED, payload: root};
}