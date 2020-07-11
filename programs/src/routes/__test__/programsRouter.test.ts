import request from "supertest";
import { app } from "../../app";
import { getProgramById } from "../programsController";

describe("POST /api/programs", () => {
  it("returns 400 when invalid params are sent", async () => {
    await request(app)
      .post("/api/programs")
      .send({
        name: "hello",
        commodity: "CORN",
      })
      .expect(400);

    await request(app)
      .post("/api/programs")
      .send({
        name: "hello",
        currentPrice: 200,
        commodity: "f",
      })
      .expect(400);

    await request(app)
      .post("/api/programs")
      .send({
        currentPrice: 200,
        commodity: "CORN",
      })
      .expect(400);
  });

  it("returns 201 when valid params are sent", async () => {
    const payload = {
      name: "hello",
      currentPrice: 200,
      commodity: "CORN",
    };

    const response = await request(app)
      .post("/api/programs")
      .send(payload)
      .expect(201);

    expect(response.body.name).toEqual(payload.name);
    expect(response.body.current_price).toEqual(payload.currentPrice);
    expect(response.body.commodity).toEqual(payload.commodity);
  });

  it("saves program to db when valid params are sent", async () => {
    const payload = {
      name: "hello",
      currentPrice: 200,
      commodity: "CORN",
    };

    const response = await request(app)
      .post("/api/programs")
      .send(payload)
      .expect(201);

    const program = await getProgramById(response.body.id);

    expect(program?.name).toEqual(payload.name);
    expect(program?.current_price).toEqual(payload.currentPrice);
    expect(program?.commodity).toEqual(payload.commodity);
  });
});
