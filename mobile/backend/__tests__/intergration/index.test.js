const request = require("supertest");
const chai = require("chai");
const { expect } = chai;
const { mongoose } = require("../../app/models");
const { Meter } = require("../../app/models/meter.model");
const app = require("../../app");
const { Token } = require("../../app/models/token.model");

describe("Meter endpoint", () => {

  afterAll(async () => {
		await mongoose.disconnect();
	});

  let meter_number,token;


  it("POST /api/meters --> should create meter successfully", async () => {

    const res = await request(app).post("/api/meters").send({
      owner_first_name: "Manzi",
      owner_last_name: "Mike",
    });
    meter_number = res.body.code;
    expect(res.statusCode).to.equal(201);
  });

  it("POST /api/meters --> should not create meter if owner_first_name is missing", async () => {
    const res = await request(app).post("/api/meters").send({
      owner_last_name: "Mike",
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('"owner_first_name" is required');
  });

  test("GET /api/meters/:number --> should return 200 on success", async () => {
    const res = await request(app).get(`/api/meters/${meter_number}`);
    expect(res.status).to.equal(200);
  });

  test("GET /api/meters/:number --> should return 404", async () => {
    const res = await request(app).get("/api/meters/100000");
    expect(res.status).to.equal(404);
  });

  it("POST /api/token --> should create token successfully", async () => {
    const res = await request(app).post("/api/token").send({
      meter_number: meter_number,
      total_amount: 1000,
    });
    token = res.body
    expect(res.statusCode).to.equal(201);
  });

  it("POST /api/token --> should not create token if total_amount is missing", async () => {
    const res = await request(app).post("/api/token").send({
      meter_number: "324287"
    });
    expect(res.statusCode).to.equal(400);
    expect(res.body.message).to.equal('"total_amount" is required');
  });

  test("GET /api/token/:id --> should return 200 on success", async () => {
    const res = await request(app).get(`/api/token/${token.code}`);
    expect(res.status).to.equal(200);
  });

  test("GET /api/token/:id --> should return 404", async () => {
    const res = await request(app).get("/api/token/16b68b07-4c9a-436f-9af4-b6c1c97e2d65");
    expect(res.status).to.equal(404);
  });

  test("POST /api/meters/loadToken --> should add 10 days of power", async () => {
    const res = await request(app).post("/api/meters/loadToken").send({
        meter_number: meter_number,
        token: token.code
      });
  
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal(`10 days added, now you have 10 days remaining`);
  });

  test("GET /api/meters/:id/details --> should return You have a0 days remaining", async () => {
    const res = await request(app).get(`/api/meters/${meter_number}/details`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("You have 10 days remaining");
  });



  test("PUT /api/meters/:number -->should return 201 if the meter is updated", async () => {
    const res = await request(app).put(`/api/meters/${meter_number}`).send({
      owner_first_name: "Irakiza",
      owner_last_name: "Divin",
    });
    expect(res.body.message).to.equal("Meter was updated successfully.");
  });

  test("PUT /api/meters/:number --> should return 404 if no data was given", async () => {
    const res = await request(app).put(`/api/meters/100000`).send({
      owner_first_name: "Izabayo1",
      owner_last_name: "Cedric",
    });
    expect(res.body.message).to.equal("Not Found");
  });

  it("DELETE /api/meters/:number -->should delete one meter successfully", async () => {
    const response = await request(app).delete(`/api/meters/${meter_number}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body.message).to.equal("Meter was deleted successfully!");
  });

  it("DELETE /api/meters/:number -->should not delete meter if id is not found", async () => {

    const response = await request(app).delete(`/api/meters/${meter_number}`);
    expect(response.statusCode).to.equal(404);
    expect(response.body.message).to.equal(
      `Could not delete Meter with number=${meter_number}`
    );
  });
});
