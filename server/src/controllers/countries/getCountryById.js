const getCountryByIdHandler = require("../../handlers/countries/getCountryById");
const translation = require("../../translations/en.json");

const getCountryById = async (req, res) => {
  const { id } = req.params;
  try {
    const country = await getCountryByIdHandler(id);
    res.status(200).json(country);
  } catch (error) {
    res
      .status(500)
      .json({ error: `${translation.getCountryById.error}: ${error.message}` });
  }
};

module.exports = getCountryById;
