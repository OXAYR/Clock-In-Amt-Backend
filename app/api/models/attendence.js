/** @format */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
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
    default: "--",
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

UserSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});
module.exports = mongoose.model("User", UserSchema);
