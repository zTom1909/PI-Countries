const { Router } = require("express");
const usersRouter = require("./users")
const countriesRouter = require("./countries")
const activitiesRouter = require("./activities")

const router = Router();

router.use("/users", usersRouter);
router.use("/countries", countriesRouter);
router.use("/activities", activitiesRouter);

module.exports = router;