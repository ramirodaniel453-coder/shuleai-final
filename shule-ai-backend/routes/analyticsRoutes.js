const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const analytics = require("../controllers/analyticsController");

router.get("/class/:classId", auth, role("admin","teacher"), analytics.classAnalytics);
router.get("/predict/:id", auth, role("admin","teacher"), analytics.predictPerformance);

module.exports = router;
