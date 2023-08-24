const { Op } = require("sequelize");
const { Country, Activity } = require("../../db");

module.exports = async (name) => {
  const includeArray = [
    {
      model: Activity,
      attributes: ["id", "name", "difficulty", "season"],
      through: {
        attributes: [],
      },
    },
  ];

  if (!name) return await Country.findAll({
    include: includeArray,
  });

  return await Country.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: includeArray,
  });
};
