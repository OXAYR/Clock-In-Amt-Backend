/** @format */

const express = require("express");
const router = express.Router();
const attendenceController = require("../app/api/controllers/attendence");

router.post("/checkIn", attendenceController.checkIn);
// router.patch("/checkOut", attendenceController.checkOut);

module.exports = router;
