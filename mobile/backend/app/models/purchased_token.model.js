const mongoose = require("mongoose");
const Joi = require("joi");
var schema = mongoose.Schema(
  {
    meter_number: { type: String, length: 6 },
    token: { type: String, length: 8 },
    token_status: {
      type: String,
      enum: ["USED", "NEW", "EXPIRED"],
    },
    token_value_days: { type: String, length: 11 },
    purchased_date: { type: Date, default: Date.now },
    amount: { type: Number, length: 11 },
    token_expiration_date: { type: Date },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Model = mongoose.model("purchased_token", schema);

module.exports.Token = Model;
module.exports.validateTokenPayload = (body) => {
  return Joi.object({
    total_amount: Joi.number().min(100).max(182500).required(),
    meter_number: Joi.string().min(6).required(),
  }).validate(body);
};
