import * as protobuf from 'protobufjs';
import {PackageDefinition} from "@grpc/proto-loader";
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

export function loadProto(filepath: string): Promise<any> {
  return protobuf.load(filepath);
}

export function loadPackageDefinition(filepath: string): Promise<PackageDefinition> {
  return protoLoader.load(
      filepath,
      {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      });
}

export function invokeGrpc(packageDefinition: PackageDefinition): Promise<any> {
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
