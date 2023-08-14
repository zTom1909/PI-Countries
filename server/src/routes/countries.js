const { Router } = require("express");
const getCountries = require("../controllers/countries/getCountries")
const getCountryById = require("../controllers/countries/getCountryById")

const router = Router();

router.get("/", getCountries)
router.get("/:id", getCountryById)

module.exports = router;