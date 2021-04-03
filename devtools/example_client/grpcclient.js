const PROTO_PATH = __dirname + '/../awesome.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const protobuf = require('protobufjs');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

packageDefinition.lookupType

const awesomepackage = grpc.loadPackageDefinition(packageDefinition).awesomepackage;
const client = new awesomepackage['AwesomeService']('localhost:50051', grpc.credentials.createInsecure());

client.DoThings({awesome_field: "sahhh", just_an_average_string: "adsgf"}, (err, stuff) => {
  // console.log(`response: ${JSON.stringify(stuff)}`);
});

protobuf.load(PROTO_PATH).then((root) => {
  const firstPackage = root.nestedArray[0];

  const serviceNames = Object.getOwnPropertyNames(firstPackage.nested).filter(item => {
    try {
      firstPackage.lookupService(item);
      return true
    } catch (e) {
      return false;
    }
  });

  const service = firstPackage.lookupService(serviceNames[0]);
  const request = firstPackage.lookup(service.methodsArray[0].requestType);
  const response = firstPackage.lookup(service.methodsArray[0].responseType);

  const asd = Object.entries(request.fields).map(([key, value]) => {
    return value;
  });


  console.log(`things: ${JSON.stringify(Object.entries(request.fields))}`);
});


