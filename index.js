/** @format */

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
// const cars = require("./routes/attendence");
// const users = require("./routes/users");
const bodyParser = require("body-parser");
const mongoose = require("./config/database");
var jwt = require("jsonwebtoken");
const app = express();
app.set("secretKey", "nodeRestApi");

// require("dotenv").config();

// mongoose.connection.on(
//   "error",
//   console.error.bind(console, "MongoDB connection error:")
// );
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.json({ tutorial: "Build REST API with node.js" });
});

// app.use("/users", users);

// app.use("/attendence", validateUser, attendence);
app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

function validateUser(req, res, next) {
  console.log("in the middleware", req.headers["x-access-token"]);
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    function (err, decoded) {
      if (err) {
        res.json({ status: "error", message: err.message, data: null });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    }
  );
}
app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404) res.status(404).json({ message: "Not found" });
  else res.status(500).json({ message: "Something looks wrong :( !!!" });
});
app.listen(4000, function () {
  console.log("Node server listening on port 4000");
});
