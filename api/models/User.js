const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  create_at: {
    type: String,
    default: moment().format("DD/MM/YYYY"),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
