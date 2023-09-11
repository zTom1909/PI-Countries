const { Router } = require("express");
const getUser = require("../controllers/users/getUser")
const register = require("../controllers/users/register")
const login = require("../controllers/users/login")

const router = Router();

router.get("/", getUser)
router.get("/login", login)
router.post("/", register)

module.exports = router;
