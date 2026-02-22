const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const studentController = require("../controllers/studentController");

router.post("/", auth, role("admin","teacher"), studentController.createStudent);
router.get("/", auth, role("admin","teacher","parent"), studentController.getStudents);

module.exports = router;
