import Postgrator from "postgrator";

const postgrator = new Postgrator({
  migrationDirectory: "./src/migrations", // path relative to build folder
  driver: "mssql",
  host: "localhost", // note that port-forwarding needs to be activated if connecting to db in kubernetes container!
  port: 1433,
  database: "TutorialDB",
  username: "sa",
  password: "23--HFEWF-f23f32wg8w3hg38gh3g3g3g3",
  // Schema table name. Optional. Default is schemaversion
  // If using Postgres, schema may be specified using . separator
  // For example, { schemaTable: 'schema_name.table_name' }
  schemaTable: "schemaversion",
});

async function doMigration() {
  try {
    const appliedMigrations = await postgrator.migrate();
    console.log("Applied Migrations", appliedMigrations);
  } catch (error) {
    console.log(error);
  }
}

doMigration();
