import { MongoMemoryServer } from "mongodb-memory-server";
// const { Docker } = require("node-docker-api");
// const docker = new Docker();
import mongoose from "mongoose";
import { getClient } from "../knex";

let mongo: any;
let sqlContainer: any;

// const PASSWORD = "2f23tgq23gtq3grsgwg4";

// async function deleteAsync() {
//   return sqlContainer.delete({ force: true });
// }

// async function checkSqlBootedAsync() {
//   let connecting = true;
//   const timeout = setTimeout(async () => {
//     connecting = false;
//     console.log(
//       "Was not able to connect to SQL container in 15000 ms. Exiting.."
//     );
//   }, 15000);

//   const mssql = require("mssql");
//   console.log("Attempting connection... ");
//   while (connecting) {
//     try {
//       mssql.close();
//       // don't use await! It doesn't play nice with the loop
//       mssql
//         .connect(`mssql://sa:${PASSWORD}@localhost/database`)
//         .then(() => {
//           clearTimeout(timeout);
//           connecting = false;
//         })
//         .catch();
//     } catch (e) {
//       // sink
//     }
//   }
//   mssql.close();
// }

// async function createContainer() {
//   const container = await docker.container.create({
//     Image: "mcr.microsoft.com/mssql/server:2019-latest",
//     name: "mssqltest",
//     ExposedPorts: { "1433/tcp": {} },
//     HostConfig: {
//       PortBindings: {
//         "1433/tcp": [{ HosttIp: "localhost", HostPort: "2000" }],
//       },
//     },
//     Env: ["SA_PASSWORD=<S00p3rS3cUr3>", "ACCEPT_EULA=Y"],
//   });

//   console.log("Container built... Starting...");

//   await container.start();
//   console.log("Container started... waiting for boot...");
//   sqlContainer = container;
//   await checkSqlBootedAsync();

//   console.log("Container booted!");
// }

beforeAll(async () => {
  // set env variables
  process.env.JWT_KEY = "agaewgg3";

  // we use Mongo memory server to run instances of mongodb in memory - allows us to direct access to db and each test suit can have its own db
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const client = getClient();

  // TODO: drop database tables and rerun migrations

  // clear data before each test
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});
