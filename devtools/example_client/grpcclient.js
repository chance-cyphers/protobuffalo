const PROTO_PATH = __dirname + '/../awesome.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
const awesomepackage = grpc.loadPackageDefinition(packageDefinition).awesomepackage;
const client = new awesomepackage.AwesomeService('localhost:50051', grpc.credentials.createInsecure());

client.DoThings({awesome_field: "sahhh", just_an_average_string: "adsgf"}, (err, stuff) => {
      console.log(`response: ${JSON.stringify(stuff)}`);
});

