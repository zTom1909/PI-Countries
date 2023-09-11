const { User, Activity, Country } = require("../../db");

module.exports = async () => {
  return await Activity.findAll({
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
        attributes: [
          "id",
          "email",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
