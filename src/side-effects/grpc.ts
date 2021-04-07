const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = __dirname + '/Users/bob/dev/protobuffalo/devtools/awesome.proto';

export function invokeGrpc(): Promise<any> {
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
  const client = new awesomepackage['AwesomeService']('localhost:50051', grpc.credentials.createInsecure());

  return new Promise<any>((resolve, reject) => {
    client.DoThings({awesome_field: "sahhh", just_an_average_string: "adsgf"}, (err: any, stuff: any) => {
      if (err) {
        console.log(`grpc failure: ${err}`);
        reject(err);
      } else {
        console.log(`grpc success! ${JSON.stringify(stuff)}`);
        resolve(stuff);
      }
    });
  });
}