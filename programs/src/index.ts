import { DatabaseConnectionError } from "@satoshi-test/common";

// In this project we set up our express app in a separate file so that it can be used for testing without having already specified a port
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    // CONNECTION JUST USING mssql WITHOUT KNEX:

    // const pool = new sql.ConnectionPool({
    //   database: "TutorialDB",
    //   user: "sa",
    //   server: "sql-server-srv",
    //   password: "23--HFEWF-f23f32wg8w3hg38gh3g3g3g3",
    // });

    // await pool.connect();

    // const request = new sql.Request(pool);
    // const result = await request.query(`SELECT * FROM dbo.Programs`);

    // console.log("result", result.recordsets);

    // start up our server
    app.listen(3000, () => {
      console.log("Programs Service: listening on port 3000");
    });
  } catch (error) {
    console.log(error);
    throw new DatabaseConnectionError();
  }
};

start();
