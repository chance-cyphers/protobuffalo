import {State} from "../reducers/protoReducer";
import jetpack from "fs-jetpack";

export function saveFile(protoState: State, appPath: string) {
  const filepath = `${appPath}/defaultproto.json`;
  console.log(`saving to: ${filepath}`);
  jetpack.write(filepath, protoState);
}

export function loadFile(appPath: string): State | null {
  if (jetpack.exists(`${appPath}/defaultproto.json`) === false) {
    return null;
  }

  const theDatas = JSON.parse(jetpack.read(`${appPath}/defaultproto.json`)!);

  console.log(`the datas: ${JSON.stringify(theDatas)}`);
  // const namedServices = theDatas.services.map((s: any) => {
  //   console.log(`name: ${s.name}`);
  //   return {name: s.name, service: Service.fromJSON(s.name, s)};
  // });



  return {...theDatas} as State;
}