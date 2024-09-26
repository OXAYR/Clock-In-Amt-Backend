/** @format */
require("dotenv").config();

const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

mongoose.Promise = global.Promise;
module.exports = mongoose;
