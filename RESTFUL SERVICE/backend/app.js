const express = require("express");
const cors = require("cors");

const app = express();

// configure cors
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Equipment Distribution system." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/employee.routes")(app);

module.exports = app;
