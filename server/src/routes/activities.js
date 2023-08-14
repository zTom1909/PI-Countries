const { Router } = require("express");
const getActivities = require("../controllers/activities/getActivities")
const addActivity = require("../controllers/activities/addActivity")

const router = Router();

router.get("/", getActivities)
router.post("/", addActivity)

module.exports = router;
