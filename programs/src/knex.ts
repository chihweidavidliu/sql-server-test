export const getClient = () => {
  const knexClient = require("knex")({
    client: "mssql",
    connection: {
      // this info will go in ENV variables and kubernetes secrets
      // WHEN RUNNING TESTS WE ARE NOT WITHIN KUBERNETES CLUSTEER SO USE PORT_FORWARDING ON THE TEST DB TO EXPOSE IT ON LOCALHOST
      host: process.env.NODE_ENV === "test" ? "localhost" : "sql-server-srv",
      user: "sa",
      password: "23--HFEWF-f23f32wg8w3hg38gh3g3g3g3",
      database: "TutorialDB",
    },
  });

  return knexClient;
};
