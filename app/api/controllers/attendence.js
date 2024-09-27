/** @format */

const attendenceModel = require("../models/attendence");
const jwt = require("jsonwebtoken");

module.exports = {
  checkIn: function (req, res, next) {
    const data = {
      userId: req.body.userId,
      Date: req.body.Date,
      Day: req.body.Day,
      Status: req.body.Status,
      InTime: req.body.InTime,
    };
    console.log("here is the attendence entity =====>", data);
  },
};
