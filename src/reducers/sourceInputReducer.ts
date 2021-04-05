import {Action, METHOD_SELECTED, PROTO_LOADED, SERVICE_SELECTED} from "../actions/actions";
import {NamespaceBase, Root} from "protobufjs";

export const initialState = {
  stuff: "hello from a reducers",
  proto: undefined,
  services: Array<Service>(),
  selectedService: undefined,
  selectedMethod: undefined
};

export interface State {
  stuff: string
  proto?: Root
  services: Service[]
  selectedService?: Service
  selectedMethod?: Method
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

export default function (state: State = initialState, action: Action): State {

  if (action.type === SERVICE_SELECTED) {
    const selectedService = state.services.find(s => s.name === action.payload);
    return { ...state, selectedService: selectedService };
  }

  if (action.type === METHOD_SELECTED) {
    const selectedMethod = state.selectedService!.methods.find(m => m.name === action.payload);
    return { ...state, selectedMethod: selectedMethod };
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
      selectedService: services[0]
    };
  }

  return state;
}