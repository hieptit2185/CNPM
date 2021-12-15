const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const List_injectSchema = new Schema({
  inject: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  date_inject: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
});

const List_inject = mongoose.model("List_inject", List_injectSchema);

module.exports = List_inject;
