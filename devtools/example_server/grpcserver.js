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
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const awesomepackage = protoDescriptor.awesomepackage;

function doThings(call, callback) {
  const resp = {
    answer_to_stuff: `suuuuuppppp: ${call.request.awesome_field}`
  };

  console.log(`request: ${JSON.stringify(call.request)}`);

  callback(null, resp);
}


function getServer() {
  const server = new grpc.Server();
  server.addService(awesomepackage.AwesomeService.service, {
    DoThings: doThings
  });
  return server;
}


const server = getServer();
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
});
