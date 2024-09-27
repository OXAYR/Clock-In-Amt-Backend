/** @format */

const express = require("express");
const router = express.Router();
const attendenceController = require("../app/api/controllers/attendence");

router.post("/checkin", attendenceController.checkIn);
router.patch("/checkout/:attendenceId", attendenceController.checkOut);
router.get("/records", attendenceController.fetchUserAttendence);

module.exports = router;
