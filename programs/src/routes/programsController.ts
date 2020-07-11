import { getClient } from "../knex";
import { NotFoundError } from "@satoshi-test/common";

export const getProgramById = async (programId: string) => {
  const client = getClient();
  const rows = await client
    .from("dbo")
    .from("dbo.Programs")
    .select("id", "name", "current_price", "commodity")
    .where("id", programId)
    .finally(() => client.destroy());

  if (!rows || !rows.length) {
    throw new NotFoundError();
  }

  return rows[0];
};
