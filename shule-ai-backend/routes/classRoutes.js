const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const classController = require("../controllers/classController");

router.post("/", auth, role("admin","teacher"), classController.createClass);
router.post("/assign", auth, role("admin","teacher"), classController.assignStudent);

module.exports = router;
