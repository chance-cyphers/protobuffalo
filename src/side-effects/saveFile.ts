import {State} from "../reducers/protoReducer";

export function saveFile(protoState: State) {
  console.log(`really saving this time... ${protoState.currentTab}`);
}