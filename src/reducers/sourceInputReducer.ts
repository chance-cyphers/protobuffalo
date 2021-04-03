import {Action, PROTO_LOADED} from "../actions/actions";
import {Method, NamespaceBase, Root} from "protobufjs";

export const initialState = {
  stuff: "hello from a reducers",
  proto: undefined,
  services: Array<Service>()
};

interface State {
  stuff: string
  proto?: Root
  services: Service[]
}

interface Service {
  name: string
  methods: Method[]
}


export default function (state: State = initialState, action: Action) {

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

      const asd = service.methodsArray.map(m => {
        return {...m}
      });

      console.log(`methods: ${JSON.stringify(asd)}`);

      return {
        name: serviceName,
        methods: [...service.methodsArray]
      };
    });

    return {
      ...state,
      proto: action.payload,
      services: services
    };
  }


  return state;
}