export const getClient = () => {
  const knexClient = require("knex")({
    client: "mssql",
    connection: {
      host: "sql-server-srv",
      user: "sa",
      password: "23--HFEWF-f23f32wg8w3hg38gh3g3g3g3",
      database: "TutorialDB",
    },
  });

  return knexClient;
};
