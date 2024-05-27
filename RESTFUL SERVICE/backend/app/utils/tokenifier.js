const jwt = require("jsonwebtoken");

exports.generateAuthToken = async (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET);
