const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const VaccineSchema = new Schema({
  nameVaccine: {
    type: String,
    required: true,
  },
  quantily: {
    type: Number,
    required: true,
  },
  create_at: {
    type: String,
    default: moment().format("DD/MM/YYYY"),
  },
});

const Vaccine = mongoose.model("Vaccine", VaccineSchema);

module.exports = Vaccine;
