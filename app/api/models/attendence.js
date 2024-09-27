/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;
const AttendenceSchema = new Schema({
  Date: {
    type: Date,
    required: true,
  },
  Day: {
    type: String,
    trim: true,
    required: true,
  },
  Status: {
    type: Number,
    required: true,
  },
  InTime: {
    type: String,
    required: true,
  },
  OutTime: {
    type: String,
    default: "--",
    required: true,
  },
  Hours: {
    type: String,
    default: "--",
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Attendence", AttendenceSchema);
