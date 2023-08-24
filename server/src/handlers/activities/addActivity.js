const { Activity, Country } = require("../../db");

module.exports = async (activity, id) => {
  const newActivity = await Activity.create(activity);
  await newActivity.addCountries([id.toUpperCase()]);

  return await Activity.findOne({
    where: { id: newActivity.id },
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
    ],
  });
};
