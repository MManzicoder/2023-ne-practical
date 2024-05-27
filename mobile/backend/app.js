const express = require("express");
const cron = require("node-cron");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const { getTokenExpirationDate } = require("./app/utils/imports");
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
const { findAll } = require("./app/controllers/purchased_token.controller");
const { Token } = require("./app/models/purchased_token.model");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Failed to connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to E-power." });
});

//middleware to log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date()}`);
  next();
});
// Schedule the cron job to run every day at 8:00 AM
cron.schedule("0 1 * * *", async () => {
  try {
    // Make a request to your token validation endpoint
    const tokens = await Token.find({});
    for (const token of tokens) {
      const tokenExpirationDate = token.token_expiration_date;
      const today = new Date();
      const isValid = today < tokenExpirationDate;
      if (!isValid) {
        await Token.findOneAndUpdate(
          { _id: token.id },
          { token_status: "EXPIRED" }
        );
      }
    }
  } catch (error) {
    console.error("Error checking token validity:", error);
  }
});

require("./app/routes/meter.routes")(app);
require("./app/routes/token.routes")(app);

module.exports = app;
