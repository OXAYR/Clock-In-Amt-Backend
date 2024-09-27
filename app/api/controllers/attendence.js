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

    attendenceModel
      .create(data)
      .then((result) => {
        res.send({ status: 200, msg: "Checked-In successfully" });
      })
      .catch((err) => {
        res.send({ status: 500, msg: "Error checking in " });
      });
  },
};
