/** @format */

const express = require("express");
const router = express.Router();
const attendenceController = require("../app/api/controllers/attendence");

router.post("/checkIn", attendenceController.checkIn);
router.patch("/checkOut/:attendenceId", attendenceController.checkOut);
router.get("/records", attendenceController.fetchUserAttendence);

module.exports = router;
