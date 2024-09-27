/** @format */

const attendenceModel = require("../models/attendence");
const jwt = require("jsonwebtoken");

const checkIn = (req, res, next) => {
  const data = {
    userId: req.body.userId,
    Date: req.body.date,
    Day: req.body.day,
    Status: req.body.status,
    InTime: req.body.inTime,
  };
  console.log("here is the attendence entity =====>", data);

  attendenceModel
    .create(data)
    .then((result) => {
      console.log("here is the data======>", data);
      res.send({ status: 200, msg: "Checked-In successfully", data: data });
    })
    .catch((err) => {
      res.send({ status: 500, msg: "Error checking in " });
    });
};

const checkOut = async (req, res, next) => {
  try {
    const { outTime } = req.body;

    const attendanceRecord = await attendenceModel.findById(
      req.params.attendeceId
    );

    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const inTime = attendanceRecord.InTime;

    const inTimeDate = new Date(inTime);
    const outTimeDate = new Date(outTime);
    const differenceInMilliseconds = outTimeDate - inTimeDate;
    const hoursWorked = differenceInMilliseconds / (1000 * 60 * 60);

    await attendenceModel.findByIdAndUpdate(req.params.attendeceId, {
      OutTime: outTime,
      Hours: hoursWorked,
    });

    res.status(200).json({ message: "Checkout successful", hoursWorked });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkIn,
  checkOut,
};
