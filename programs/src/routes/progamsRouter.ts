import { Router, Request, Response } from "express";
import { body } from "express-validator";
import {
  validateRequest,
  COMMODITY,
  NotFoundError,
  UserType,
} from "@satoshi-test/common";
import { getClient } from "../knex";

interface RequestUser {
  id: string;
  email: string;
  name: string;
  type: UserType;
}

// augment Request object
declare global {
  namespace Express {
    interface Request {
      currentUser?: RequestUser;
    }
  }
}

const programsRouter = Router();

programsRouter.get("/api/programs", async (req, res) => {
  const client = getClient();

  const { commodityType } = req.query;

  const query = client
    .from("dbo.Programs")
    .select("id", "name", "current_price", "commodity");

  if (commodityType) {
    query.where("commodity", commodityType);
  }

  const rows = await query.finally(() => client.destroy()); // NEED TO DO THIS TO FREE UP POOL CONNECTION

  res.send(rows);
});

programsRouter.post(
  "/api/programs",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("currentPrice").isFloat().withMessage("Current Price is required"),
    body("commodity")
      .trim()
      .notEmpty()
      .isIn([COMMODITY.CORN, COMMODITY.LIVESTOCK, COMMODITY.SOYA])
      .withMessage("Invalid Commodity Type"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, currentPrice, commodity } = req.body;

    const client = getClient();

    const rows = await client("dbo.Programs")
      .insert([{ name, current_price: currentPrice, commodity }])
      .returning("*")
      .finally(() => client.destroy());

    const program = rows[0];

    res.status(201).send(program);
  }
);

programsRouter.get("/api/programs/:programId", async (req, res) => {
  const { programId } = req.params;
  // const program = await Program.findById(programId);

  const client = getClient();
  const rows = await client
    .from("dbo.Programs")
    .select("id", "name", "current_price", "commodity")
    .where("id", programId)
    .finally(() => client.destroy());

  if (!rows || !rows.length) {
    throw new NotFoundError();
  }

  res.send(rows[0]);
});

export { programsRouter };
