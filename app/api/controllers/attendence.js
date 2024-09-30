/** @format */

const attendenceModel = require("../models/attendence");
const jwt = require("jsonwebtoken");

const checkIn = async (req, res, next) => {
  const data = {
    userId: req.body.userId,
    Date: req.body.date,
    Day: req.body.day,
    Status: req.body.status,
    InTime: req.body.inTime,
  };

  await attendenceModel
    .create(data)
    .then((result) => {
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
      req.params.attendenceId
    );

    if (!attendanceRecord) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    const inTime = attendanceRecord.InTime;

    const inTimeDate = new Date(inTime);
    const outTimeDate = new Date(outTime);
    const differenceInMilliseconds = outTimeDate - inTimeDate;
    const hoursWorked = differenceInMilliseconds / (1000 * 60 * 60);
    await attendenceModel.updateSearchIndex(req.params.attendeceId, {
      OutTime: outTime,
      Hours: hoursWorked,
    });

    res.status(200).json({ message: "Checkout successful", hoursWorked });
  } catch (error) {
    next(error);
  }
};

const fetchUserAttendence = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const records = await attendenceModel.find({ userId: userId });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let todayAttendenceId = null;

    const isPresentToday = records.some((record) => {
      const recordDate = new Date(record.Date);
      console.log("heri s hte record===>", recordDate);
      recordDate.setHours(0, 0, 0, 0);
      if (recordDate.getTime() === today.getTime()) {
        todayAttendenceId = record._id;
        return true;
      }
    });
    console.log("here s the is present", isPresentToday);
    res.status(200).json({
      message: "User Record Fetch successfully",
      records,
      isPresentToday,
      todayAttendenceId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkIn,
  checkOut,
  fetchUserAttendence,
};
