const { User, Activity, Country } = require("../../db");

module.exports = async ({ difficulty, season }) => {
  let filters = {}
  if (difficulty) filters.difficulty = difficulty
  if (season) filters.season = season
  return await Activity.findAll({
    where: filters,
    include: [
      {
        model: Country,
        attributes: [
          "id",
          "name",
          "image",
          "region",
          "subregion",
          "capitalCity",
          "area",
          "population",
        ],
        through: {
          attributes: [],
        },
      },
      {
        model: User,
        attributes: ["id", "email"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
