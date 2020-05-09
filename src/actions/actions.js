export const PROTO_LOADED = "PROTO_LOADED";


export function protoLoaded(root) {
    return {type: PROTO_LOADED, payload: root};
}