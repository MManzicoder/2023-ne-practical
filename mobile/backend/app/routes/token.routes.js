module.exports = (app) => {
  const token = require("../controllers/purchased_token.controller.js");

  var router = require("express").Router();

  // Create a new Token
  router.post("/", token.create);
  router.get("/:meter_number/tokens", token.findByMeter);
  router.get("/:meter_number/:token", token.findByMeterAndToken);
  router.get("/:token", token.getTokenValidDays);
  app.use("/api/token", router);
};
