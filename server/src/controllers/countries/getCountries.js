const getCountriesHandler = require("../../handlers/countries/getCountries");
const translation = require("../../translations/en.json");

const getCountries = async (req, res) => {
  const { name } = req.query;
  try {
    const countries = await getCountriesHandler(name);
    res.status(200).json(countries);
  } catch (error) {
    res
      .status(500)
      .json({ error: `${translation.getCountries.error}: ${error.message}` });
  }
};

module.exports = getCountries;
