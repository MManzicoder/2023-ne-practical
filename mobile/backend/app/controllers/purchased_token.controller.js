const db = require("../models");
const {
  validateTokenPayload,
  Token,
} = require("../models/purchased_token.model");

const {
  getTokenExpirationDate,
  generateToken,
  getDaysDifference,
} = require("../utils/imports");

// Create and Save a new Token
exports.create = async (req, res) => {
  // Validate request
  const { error } = validateTokenPayload(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  } else if (req.body.total_amount % 100)
    return res
      .status(400)
      .json({ message: "total amount should be a multiple of 100" });
  //
  //get token_value_days
  const getTokenValueDays = (amount) => {
    const days = amount / 100;
    return days;
  };

  // Save Token in the database
  Token.create({
    meter_number: req.body.meter_number,
    amount: req.body.total_amount,
    token: generateToken(),
    token_value_days: getTokenValueDays(req.body.total_amount),
    token_expiration_date: getTokenExpirationDate(req.body.total_amount),
    token_status: "NEW",
  })
    .then((data) => {
      res.status(201).json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while creating the Token.",
      });
    });
};

// Find a single Token by code
exports.findOne = (req, res) => {
  const code = req.params.code;

  Token.findOne({ code })
    .then((data) => {
      if (!data)
        res.status(404).json({
          message: "Not found Token with code " + code,
        });
      else res.json({ data });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error retrieving Token with code=" + code,
      });
    });
};

exports.findAll = async (req, res) => {
  Token.find({})
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving tokens.",
      });
    });
};

exports.findByMeter = (req, res) => {
  const meter_number = req.params.meter_number;
  Token.find({ meter_number })
    .then((data) => {
      //find the remaining days for each token
      const tokens = data.map((token) => {
        const token_expiration_date = getTokenExpirationDate(
          token.total_amount
        );
        const days = getDaysDifference(token_expiration_date);
        return { ...token._doc, days };
      });
      res.json({ success: true, data: tokens });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving tokens.",
      });
    });
};

exports.findByMeterAndToken = (req, res) => {
  const meter_number = req.params.meter_number;
  const token = req.params.token;
  Token.find({ meter_number, token })
    .then((data) => {
      res.json({ success: true, data });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred while retrieving tokens.",
      });
    });
};

exports.getTokenValidDays = async (req, res) => {
  const token = req.params.token;
  const getToken = await Token.findOne({ token });
  console.log("token found", getToken);
  if (!getToken) {
    return res.json({ success: false, message: "Invalid token!" });
  }

  const days = getDaysDifference(getToken.token_expiration_date);
  getToken.token_value_days = days;
  await getToken.save();
  res.json({ success: true, days });
};
