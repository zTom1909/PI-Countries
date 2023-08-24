const { Op } = require("sequelize");
const { Country, Activity } = require("../../db");

module.exports = async (name, page) => {
  const includeArray = [
    {
      model: Activity,
      attributes: ["id", "name", "difficulty", "season"],
      through: {
        attributes: [],
      },
    },
  ];

  const allCountries = await Country.findAll({
    include: includeArray,
  });
  if (!name)
    return page
      ? allCountries.slice(page * 10 - 10, page * 10)
      : allCountries;

  const filteredCountries = await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: includeArray,
  });
  return page
    ? filteredCountries.slice(page * 10 - 10, page * 10)
    : filteredCountries;
};
