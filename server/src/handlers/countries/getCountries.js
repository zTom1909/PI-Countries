const { Op } = require("sequelize");
const { Country, Activity, User } = require("../../db");

module.exports = async (name, page, email) => {
  const includeArray = [
    {
      model: Activity,
      include: [
        {
          model: User,
          where: { email }
        }
      ],
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
    return page ? allCountries.slice(page * 10 - 10, page * 10) : allCountries;

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
